class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.integer :house_income, default: 50500

      t.timestamps
    end
  end
end
