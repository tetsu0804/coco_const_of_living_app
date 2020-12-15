class CreateSubCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :sub_categories do |t|
      t.string :sub_category_name, null: false, unique: true
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
