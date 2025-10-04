require 'rails_helper'

RSpec.describe "Routes", type: :routing do
  it "routes users#create" do
    expect(post: "/users").to route_to(controller: "users", action: "create")
  end

  it "routes login" do
    expect(post: "/login").to route_to("sessions#create")
  end

  it "routes athletes" do
    expect(get: "/athletes").to route_to(controller: "athletes", action: "index")
  end

  it "routes applications" do
    expect(get: "/applications").to route_to(controller: "applications", action: "index")
  end

  it "routes documents create" do
    expect(post: "/documents").to route_to(controller: "documents", action: "create")
  end
end
