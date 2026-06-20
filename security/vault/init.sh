#!/bin/sh
set -e

echo "Initializing Vault..."
# In a real environment, you securely store the unseal keys and root token
vault operator init -key-shares=1 -key-threshold=1 > /vault/file/keys.txt

export VAULT_TOKEN=$(grep 'Initial Root Token:' /vault/file/keys.txt | awk '{print $4}')
UNSEAL_KEY=$(grep 'Unseal Key 1:' /vault/file/keys.txt | awk '{print $4}')

vault operator unseal $UNSEAL_KEY

echo "Enabling KV-V2 Secrets Engine..."
vault secrets enable -path=secret kv-v2

echo "Writing Secrets..."
vault kv put secret/edupulse/database @/vault/config/secrets/database.json
vault kv put secret/edupulse/auth @/vault/config/secrets/auth.json
vault kv put secret/edupulse/ai @/vault/config/secrets/ai.json
vault kv put secret/edupulse/aws @/vault/config/secrets/aws.json

echo "Writing Policies..."
vault policy write backend-policy /vault/config/policies/backend-policy.hcl
vault policy write devops-policy /vault/config/policies/devops-policy.hcl
vault policy write monitoring-policy /vault/config/policies/monitoring-policy.hcl

echo "Enabling Kubernetes Auth..."
vault auth enable kubernetes

vault write auth/kubernetes/config \
    kubernetes_host="https://$KUBERNETES_PORT_443_TCP_ADDR:443"

vault write auth/kubernetes/role/edupulse-backend \
    bound_service_account_names=edupulse-backend-sa \
    bound_service_account_namespaces=edupulse \
    policies=backend-policy \
    ttl=24h

echo "Vault Bootstrap Complete!"
