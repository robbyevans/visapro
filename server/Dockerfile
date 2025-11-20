# Dockerfile
# syntax = docker/dockerfile:1

ARG RUBY_VERSION=3.2.2
FROM ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

# Install base packages
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      curl \
      git \
      libjemalloc2 \
      libpq-dev \
      nodejs \
      npm \
      && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"

FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      pkg-config \
      && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Gems
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3 && \
    rm -rf ~/.bundle

# Copy app
COPY . .

# Precompile bootsnap
RUN bundle exec bootsnap precompile app/ lib/ || true

FROM base

# Runtime deps
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y postgresql-client && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails

# Create non-root user
RUN groupadd --system --gid 1000 rails && \
    useradd --system rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    mkdir -p /rails/tmp /rails/log /rails/storage && \
    chown -R rails:rails /rails

USER rails

WORKDIR /rails

# Entrypoint script (prepared by you)
COPY --chown=rails:rails --chmod=755 bin/docker-entrypoint /usr/local/bin/docker-entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint"]

EXPOSE 3000

# Force port 3000 regardless of PORT environment variable
CMD ["./bin/rails", "server", "-b", "0.0.0.0", "-p", "3000"]
