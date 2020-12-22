class Api::V1::GoodsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    sub_category = SubCategory.find_by(sub_category_name: goods_params[:sub_category_name])
    category = Category.find(sub_category.category_id)
    goods = Good.new(goods_name: goods_params[:goods_name], price: goods_params[:price], create_day: Time.zone.parse(goods_params[:create_day]), sub_category_id: sub_category.id )
    if goods.save
      render json: { goods: goods, sub_category: sub_category.sub_category_name, category: category.category_name}
    else
      render json: '不正な値がある可能性がある為失敗しました'
    end
  end

  private

    def goods_params
      params.permit(:goods_name, :price, :create_day, :sub_category_name )
    end
end
