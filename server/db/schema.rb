# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_10_04_131211) do
  create_table "applications", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "athlete_id", null: false
    t.string "country"
    t.integer "status", default: 0, null: false
    t.text "remarks"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["athlete_id"], name: "index_applications_on_athlete_id"
    t.index ["user_id"], name: "index_applications_on_user_id"
  end

  create_table "athletes", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "passport_number"
    t.index ["user_id"], name: "index_athletes_on_user_id"
  end

  create_table "documents", force: :cascade do |t|
    t.integer "application_id", null: false
    t.integer "doc_type"
    t.string "file_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["application_id"], name: "index_documents_on_application_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "applications", "athletes"
  add_foreign_key "applications", "users"
  add_foreign_key "athletes", "users"
  add_foreign_key "documents", "applications"
end
