# Kibana Dashboard Configurations

Since Kibana exported dashboards are large NDJSON objects that are unreadable in Git, this directory serves as the configuration guide for provisioning the EduPulse dashboards in Kibana once the ELK stack is online.

## 1. System Logs Dashboard
**Filters**: `!parsed_json.event: *` (Focuses on raw infrastructure logs)
**Visualizations**:
- **Log Levels Pie Chart**: Aggregation on `log.level` (ERROR vs WARN vs INFO).
- **Pod Failures Time Series**: Count of documents where `kubernetes.container.name` exists and message contains "crash" or "Exception".
- **API Errors Bar Chart**: Status code > 499 derived from Nginx ingress logs.

## 2. User Activity Dashboard
**Filters**: `parsed_json.event: "student_login" OR parsed_json.event: "assignments_completed"`
**Visualizations**:
- **Login Heatmap**: Aggregation of `parsed_json.event: "student_login"` over time of day.
- **Assignment Submission Counter**: Metric visualization counting `assignments_completed` events.
- **User Roles Bar Chart**: Aggregation on `parsed_json.role` to see ratio of students to teachers interacting with the platform.

## 3. Intervention Analytics Dashboard
**Filters**: `parsed_json.event: "intervention_created" OR parsed_json.event: "intervention_closed"`
**Visualizations**:
- **Intervention Funnel**: Ratio of created interventions vs closed interventions.
- **High Risk Triggers Timeline**: Spikes in intervention creations correlating with specific time periods (e.g., midterm exams).

---

## 🚨 Kibana Alerting (Watcher)

To configure Alerts based on logs, use the following logic in Kibana's Stack Management -> Rules:

### Repeated Login Failures
- **Condition**: Count of `parsed_json.event: "login_failed"` > 10 within 5 minutes for a single `parsed_json.user_id`.
- **Action**: Slack/Email Notification to Security Team.

### High Intervention Creation Rate
- **Condition**: Count of `parsed_json.event: "intervention_created"` > 50 within 1 hour.
- **Action**: Alert Academic Advisors to review potential systemic curriculum issues.
