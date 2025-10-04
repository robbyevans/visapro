require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:name) }
  it { should have_many(:athletes).dependent(:destroy) }
  it { should have_many(:applications).dependent(:destroy) }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end
end