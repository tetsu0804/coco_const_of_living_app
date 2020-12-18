class Api::V1::SubCategoriesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def destroy
    sub_category = SubCategory.find_by(sub_category_name: params[:sub_category_name])
    sub_category.destroy
    head :no_content
  end
end
