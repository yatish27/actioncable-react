require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ActioncableReact
  class Application < Rails::Application
    config.action_cable.mount_path = '/cable'
  end
end
