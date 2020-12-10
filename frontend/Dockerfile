FROM docker.io/nimlang/nim:latest-alpine AS builder
ENV LD_LIBRARY_PATH=/usr/local/lib/

#Alpine
RUN apk update
RUN apk add bsd-compat-headers

# Build vb_tools and vb_server
RUN mkdir /tmp/VariantBrowser
WORKDIR   /tmp/VariantBrowser
COPY .    /tmp/VariantBrowser
# Build and test
# .git is from submodule, pointing outside the context
RUN rm -rf .git && git init && nimble install -y && nimble build

# Create the final image 
FROM docker.io/alpine:latest
ENV  LD_LIBRARY_PATH=/usr/local/lib/
RUN  mkdir -p /data/config
COPY --from=builder /tmp/VariantBrowser/vb_frontend  /usr/bin/
COPY --from=builder /usr/lib/*                       /usr/lib/
COPY --from=builder /tmp/VariantBrowser/config/      /data/config/
COPY --from=builder /tmp/VariantBrowser/public/      /data/public/
WORKDIR /data

EXPOSE 5001


