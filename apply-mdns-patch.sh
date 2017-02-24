#!/usr/bin/env bash

# Need to apply this patch to avoid a spurious discovery issue

cp -f ./mdns_hack/resolver_sequence_tasks.js.hack node_modules/mdns/lib/resolver_sequence_tasks.js
echo "Applied patch"