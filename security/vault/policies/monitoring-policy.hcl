path "secret/data/edupulse/grafana" {
  capabilities = ["read"]
}

path "secret/data/edupulse/prometheus" {
  capabilities = ["read"]
}

path "secret/data/edupulse/elasticsearch" {
  capabilities = ["read"]
}

# Deny everything else
path "secret/data/edupulse/*" {
  capabilities = ["deny"]
}
