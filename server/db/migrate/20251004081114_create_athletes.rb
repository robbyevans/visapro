class CreateAthletes < ActiveRecord::Migration[7.2]
  def change
    create_table :athletes do |t|
      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
