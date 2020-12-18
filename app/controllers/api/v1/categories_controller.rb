class Api::V1::CategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    category = Category.find_by(category_name: category_params[:category_name])

    if category.present?
      sub_category = SubCategory.new(sub_category_name: category_params[:sub_category_name], category_id: category.id)
      if sub_category.save
        render json: { category: category, sub_category: sub_category }
      else
        render json: 'すでに存在するカテゴリとサブカテゴリがあるか、サブカテゴリに不正な値がある可能性があります。'
      end
    else
      new_category = Category.new(category_name: category_params[:category_name])
      if new_category.save
        sub_category = SubCategory.new(sub_category_name: category_params[:sub_category_name], category_id: new_category.id)
        if sub_category.save
          render json: { category: new_category, sub_category: sub_category }
        else
          render json: 'カテゴリもしくはサブカテゴリに不正な値を含んでいる可能性があります。', status: :unauthorized
        end
      else
        render json: 'カテゴリもしくはサブカテゴリに不正な値を含んでいる可能性があります。', status: :unauthorized
      end
    end
  end

  private

    def category_params
      params.permit(:category_name, :sub_category_name)
    end
end
