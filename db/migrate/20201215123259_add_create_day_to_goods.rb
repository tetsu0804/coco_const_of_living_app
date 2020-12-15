class AddCreateDayToGoods < ActiveRecord::Migration[5.2]
  def change
    add_column :goods, :create_day, :datetime, null: false
  end
end
