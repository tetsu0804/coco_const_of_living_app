class CreateGoods < ActiveRecord::Migration[5.2]
  def change
    create_table :goods do |t|
      t.string :goods_name, null: false
      t.integer :price, null: false
      t.references :sub_category, foreign_key: true

      t.timestamps
    end
  end
end
