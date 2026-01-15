// ---------- CONFIGURATION (TEMPLATE) ----------
// Jira cloud site base URL (no trailing slash)
const JIRA_BASE_URL = "https://<your-site>.atlassian.net";

// Jira auth (recommended: store in Script Properties; see optional section below)
const JIRA_EMAIL = "<jira-email@example.com>";
const JIRA_API_TOKEN = "<jira-api-token>";

// Project key that contains the Epics + child issues
const JIRA_PROJECT_KEY = "<PROJECT_KEY>"; // e.g., "GRENSV"

// Epic matching:
// - If you can match by Epic summary only, leave EPIC_NAME_FIELD empty.
// - If you need a custom field for Epic Name/Title, set to the field ID, e.g. "customfield_12345".
const EPIC_NAME_FIELD = ""; // "" OR "customfield_#####" (TEAM-MANAGED SAFE)

// Sheet shape
// New sheet uses columns A → M = 13 columns total
const SHEET_COL_COUNT = 13;

/*************************************************
 * SHEET COLUMN MAP (A→M)
 * A  Jira ID         (0)
 * B  Feature ID      (1)
 * C  Test Item       (2)  <-- Jira summary
 * D  Test objective  (3)
 * E  Test procedure  (4)
 * F  Comments        (5)
 * G  Priority        (6)  <-- P0/P1/P2/P3 in sheet
 * H  Expected        (7)
 * I  Test Condition  (8)
 * J  Platform        (9)
 * K  Last Updated    (10)
 * L  Assignee        (11) <-- full name in sheet
 * M  Jira Status     (12)
 *************************************************/

/*************************************************
 * ISSUE CREATION DEFAULTS
 *************************************************/
const DEFAULT_ISSUE_TYPE = "Task"; // e.g. "Task", "Story", etc.

// Optional: if your Jira needs explicit "Epic Link" instead of parent,
// set EPIC_LINK_FIELD to your custom field id (classic projects often).
// Leave blank if you're using `parent: { key: epicKey }` (team-managed style).
const EPIC_LINK_FIELD = ""; // "" OR "customfield_#####" (classic epic-link)

/*************************************************
 * PRIORITY MAPPING (Sheet ↔ Jira)
 *************************************************/
const PRIORITY_SHEET_TO_JIRA = {
  P0: "Showstopper",
  P1: "Critical",
  P2: "Normal",
  P3: "Low",
};

const PRIORITY_JIRA_TO_SHEET = {
  Showstopper: "P0",
  Critical: "P1",
  Normal: "P2",
  Low: "P3",
};

/*************************************************
 * ASSIGNEE MAP (Sheet full name → Jira accountId)
 * NOTE: accountId is required by Jira Cloud.
 *************************************************/
const ASSIGNEE_MAP = {
  "<Full Name 1>": "<accountId-1>",
  "<Full Name 2>": "<accountId-2>",
  // Example:
  // "Ryan Faxigue": "712020:811e05a1-6684-44c5-ac95-2e6df00edbb1",
};

/*************************************************
 * OPTIONAL: SCRIPT PROPERTIES (recommended for secrets)
 * If you use these, set JIRA_EMAIL/JIRA_API_TOKEN to "" above,
 * then read from PropertiesService in getAuthHeader().
 *************************************************/
// const USE_SCRIPT_PROPERTIES_FOR_AUTH = true;
// const PROP_JIRA_EMAIL = "JIRA_EMAIL";
// const PROP_JIRA_API_TOKEN = "JIRA_API_TOKEN";

// ---------- END CONFIGURATION ----------
