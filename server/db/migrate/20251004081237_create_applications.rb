class CreateApplications < ActiveRecord::Migration[7.2]
  def change
    create_table :applications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :athlete, null: false, foreign_key: true
      t.string :country
      t.integer :status, default: 0, null: false
      t.text :remarks

      t.timestamps
    end
  end
end
