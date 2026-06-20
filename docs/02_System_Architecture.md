# 2. System Architecture
## High Level Diagram
```mermaid
flowchart TD
    Students --> ALB[AWS Load Balancer]
    Teachers --> ALB
    Admins --> ALB
    ALB --> ReactFrontend[React Frontend (EduPulse)]
    ReactFrontend --> FastAPIBackend[FastAPI Backend]
    FastAPIBackend --> Postgres[(Postgres)]
    FastAPIBackend --> Redis[(Redis)]
    FastAPIBackend --> GeminiAI[Gemini AI]
    FastAPIBackend --> AnalyticsEngine[Analytics Engine]
    AnalyticsEngine --> Prometheus[Prometheus]
    Prometheus --> Grafana[Grafana]
    AnalyticsEngine --> ELK[ELK Stack]
    Prometheus --> KubernetesEKS[Kubernetes (EKS)]
    Grafana --> KubernetesEKS
    ELK --> KubernetesEKS
    KubernetesEKS --> AWSCloud[AWS Cloud]
```
