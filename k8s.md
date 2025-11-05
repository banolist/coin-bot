# Deployment in kubernetes

## Prerequisites
- [https://github.com/helm/helm](helm)
- [https://github.com/bitnami-labs/sealed-secrets/releases](Sealed Secret)

## 🛠️ Quick Start

1. Create secret files in project root:
   `secret-bots.yaml`
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: bots-tokens
     namespace: banolist/coinbots
   type: Opaque
   stringData:
     bot-1: "1234567890:Abs..."
     bot-2: "1234568131:Dbke_..."
     bot-N: ""
     ...
   ```
   `secret-global.yaml`
   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: bot-global-secret
     namespace: banolist/coinbots
   type: Opaque
   stringData:
     token: "coingecko token"
   ```

2. Get pub-cert from cluster:
   ```bash
   kubeseal --fetch-cert --controller-name=sealed-secrets --controller-namespace=kube-system > infra/sealed-secrets/pub-cert.pem 
   ```

3. Make secret files:
   ```bash
   go-task secrets:seal
   ```

4. Update values in [./helm/values.yaml](values.yaml):
   ```bash
   bots:
     - id: 1
       username: valie_for_optional_label
     - id: 2
     ...

   ```

5. Deploy in cluster:
   ```bash
   go-task deploy
   ```

