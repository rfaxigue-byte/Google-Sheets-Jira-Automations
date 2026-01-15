# Google-Sheets-Jira-Automations
📊 Jira ↔ Google Sheets Test Management Automation

This project provides two Google Apps Script utilities that integrate Google Sheets with Jira Cloud:

Jira ⇄ Sheets Sync – bi-directional synchronization of test cases stored in Sheets with Jira issues under Epics

Jira Linkifier – automatically converts Jira issue keys in Column A into clickable Jira links

These scripts are designed for team-managed Jira projects, but can be adapted for classic projects.

1️⃣ Jira ⇄ Sheets Sync Script Purpose

Maintain test cases in Google Sheets while keeping Jira as the source of truth for:

Issue creation

Updates (summary, description, priority, assignee)

Status and assignee pull-back

Each sheet tab represents one Epic. Each row represents one Jira issue under that Epic.

Sheet Structure (Required)

Each sheet must follow this exact column layout:

Column Name Description A Jira ID Jira issue key (auto-filled) B Feature ID Optional feature reference C Test Item Mapped to Jira Summary D Test Objective Part of Jira description E Test Procedure Part of Jira description F Comments Part of Jira description G Priority P0 / P1 / P2 / P3 H Expected Part of Jira description I Test Condition Part of Jira description J Platform Part of Jira description K Last Updated Auto-maintained timestamp L Assignee Full name (mapped to accountId) M Jira Status Pulled from Jira

Row 1 is assumed to be headers. Data starts on row 2.

Epic Mapping Logic

Sheet tab name must match the Epic name (or Epic Name custom field)

Script searches Jira using JQL:

project = <PROJECT_KEY>

issuetype = Epic

summary ~ ""

If the Epic is not found, the sheet is skipped.

Jira Behavior

Sheet → Jira

Empty Jira ID → creates a new issue under the Epic

Existing Jira ID → updates the issue

Summary comes from Column C

Description is generated using Jira ADF (structured text)

Priority and Assignee are optional

Jira → Sheet

Pulls latest:

Summary

Priority

Assignee

Status

Description fields (parsed back into columns)

Configuration (Required)

You must configure the following constants at the top of the script:

const JIRA_BASE_URL = "https://.atlassian.net"; const JIRA_EMAIL = ""; const JIRA_API_TOKEN = ""; const JIRA_PROJECT_KEY = "<PROJECT_KEY>";

You must also map assignees:

const ASSIGNEE_MAP = { "Full Name": "jira-account-id" };

ℹ️ Jira Cloud requires accountId, not usernames or emails.

Available Functions Function Description pushSheetToJira() Push sheet changes into Jira pullJiraToSheet() Pull Jira updates back into sheets syncJiraAndSheet() Push then pull (recommended) 2️⃣ Jira Linkifier Script (Column A Only) Purpose

Automatically converts Jira issue keys in Column A into clickable Jira links:

GRENSV-123 → https://your-site.atlassian.net/browse/GRENSV-123

This keeps sheets readable while preserving Jira navigation.

Behavior

Only affects Column A

Skips sheets named:

README, Instructions, Config, Summary, Template

Any sheet starting with _

Skips rows below an ARCHIVE marker (optional)

Does not overwrite existing =HYPERLINK() formulas

Detects keys using regex:

ABC-123, PROJ1-456, etc.

Configuration const JIRA_BASE_URL = "https://.atlassian.net";

Optional:

Change archive marker text

Change sheet skip rules

Change Jira key regex

Function Function Description linkifyColumnAOnly() Converts Jira keys to links Recommended Usage Flow

Create or rename sheet tabs to match Epic names

Fill in test cases (leave Jira ID empty)

Run syncJiraAndSheet()

Run linkifyColumnAOnly() (optional but recommended)

Continue editing in Sheets or Jira as needed

Notes & Best Practices

Do not manually edit Column A once linked

Use consistent assignee names

Avoid renaming sheet tabs after Jira issues are created

Run sync manually or via time-based trigger

Known Limitations

Designed for team-managed projects

One Epic per sheet

Description formatting is plain paragraphs (ADF)

No transition of Jira status (read-only)

Ownership & Maintenance

Script Owner: <Team / Owner>

Jira Project: <PROJECT_KEY>

Contact:
