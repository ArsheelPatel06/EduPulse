path "secret/data/edupulse/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

path "secret/metadata/edupulse/*" {
  capabilities = ["list", "read", "delete"]
}
