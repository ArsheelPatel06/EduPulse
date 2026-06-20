path "secret/data/edupulse/database" {
  capabilities = ["read"]
}

path "secret/data/edupulse/auth" {
  capabilities = ["read"]
}

path "secret/data/edupulse/ai" {
  capabilities = ["read"]
}

# Explicitly deny AWS access to backend
path "secret/data/edupulse/aws" {
  capabilities = ["deny"]
}
