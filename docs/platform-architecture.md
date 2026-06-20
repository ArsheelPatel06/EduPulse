# EduPulse: Enterprise Platform Architecture

This document provides a comprehensive technical breakdown of the EduPulse Academic Intelligence Platform.

## 1. Cloud Infrastructure Architecture

EduPulse relies on a deeply modular, high-availability AWS environment managed entirely via Terraform Infrastructure-as-Code.

```mermaid
flowchart TD
    %% Styling
    classDef userLayer fill:#f9f,stroke:#333,stroke-width:2px;
    classDef appLayer fill:#bbf,stroke:#333,stroke-width:2px;
    classDef platformLayer fill:#bfb,stroke:#333,stroke-width:2px;
    classDef securityLayer fill:#fbf,stroke:#333,stroke-width:2px;
    classDef monitorLayer fill:#dff,stroke:#333,stroke-width:2px;

    %% User Layer
    subgraph User Layer
        Students
        Teachers
        Administrators
    end

    %% Application Layer
    subgraph Kubernetes Application Layer
        ALB[AWS Load Balancer]
        Ingress[NGINX Ingress]
        Frontend[React Frontend Pods]
        Backend[FastAPI Backend Pods]
    end

    %% Security Layer
    subgraph Enterprise Security Layer
        Vault[HashiCorp Vault]
        VaultInjector[Vault Agent Sidecar]
    end

    %% Data Layer
    subgraph Data & Storage Layer
        RDS[(Amazon RDS PostgreSQL Multi-AZ)]
        Redis[(Redis Caching Layer)]
        S3[Amazon S3 Encrypted Storage]
    end

    %% Observability Layer
    subgraph Observability Layer
        Prometheus
        Grafana
        ELK[ELK Stack]
    end

    %% Routing
    Students --> ALB
    Teachers --> ALB
    Administrators --> ALB
    ALB --> Ingress
    Ingress -->|/api| Backend
    Ingress -->|/| Frontend
    Frontend --> Backend

    %% Security
    Backend -.->|Dynamic Secret Pull| VaultInjector
    VaultInjector -.-> Vault

    %% Data
    Backend -->|Persistent Data| RDS
    Backend -->|Session/Cache| Redis
    Backend -->|Case Studies| S3

    %% Monitoring
    Backend -.->|Business Metrics| Prometheus
    Prometheus --> Grafana
    Backend -.->|JSON Logs| ELK
```

## 2. Database Design (PostgreSQL)

The platform utilizes a structured relational database model designed to track student momentum, course progression, and targeted interventions.

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string hashed_password
        enum role "student, teacher, admin"
        boolean is_active
        timestamp created_at
    }
    STUDENT_PROFILES {
        uuid id PK
        uuid user_id FK
        float gpa
        float placement_readiness_score
        int risk_level "0-100"
    }
    COURSES {
        uuid id PK
        uuid teacher_id FK
        string title
        string description
        string syllabus_url
    }
    ENROLLMENTS {
        uuid id PK
        uuid student_id FK
        uuid course_id FK
        float current_grade
        timestamp enrolled_at
    }
    INTERVENTIONS {
        uuid id PK
        uuid student_id FK
        uuid created_by FK
        enum type "academic, behavioral, ai_assisted"
        string notes
        enum status "open, in_progress, resolved"
    }

    USERS ||--o| STUDENT_PROFILES : "has"
    USERS ||--o{ COURSES : "teaches"
    USERS ||--o{ ENROLLMENTS : "student"
    COURSES ||--o{ ENROLLMENTS : "includes"
    STUDENT_PROFILES ||--o{ INTERVENTIONS : "receives"
    USERS ||--o{ INTERVENTIONS : "creates"
```

## 3. CI/CD & Deployment Strategy

Our DevOps philosophy relies on zero manual intervention beyond the initial Terraform `apply`. 

1. **Version Control:** All code lives in GitHub.
2. **Continuous Integration (Jenkins):** Upon a commit to `main`, Jenkins triggers an automated pipeline that lints the code, builds the `edupulse-frontend` and `edupulse-backend` Docker containers, and pushes them to Amazon ECR.
3. **Continuous Deployment (Kubernetes):** Jenkins updates the Kubernetes deployment manifests and executes a rolling update across the EKS cluster.
4. **Zero-Downtime:** The Kubernetes Horizontal Pod Autoscaler (HPA) ensures that new replica sets are scaled up and health-checked via Prometheus before terminating the old pods.

## 4. Security Posture

- **No Hardcoded Secrets:** We utilize HashiCorp Vault. K8s pods launch with a Vault Agent sidecar that authenticates via a strict IAM role. It fetches secrets (Database Passwords, AI API Keys) and injects them directly into memory (`/vault/secrets/`). They never touch the disk.
- **Network Isolation:** RDS and Vault reside in private VPC subnets. They cannot be routed from the public internet. All traffic must pass through the NGINX Ingress Controller.
- **Encryption:** All S3 buckets enforce `AES256` Server-Side Encryption. RDS utilizes AWS KMS for storage encryption at rest.
