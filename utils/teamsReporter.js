import 'dotenv/config';

class TeamsReporter {
  constructor() {
    this.results = new Map();
  }

  onTestEnd(test, result) {
    this.results.set(test.id, {
      title: test.title,
      status: result.status
    });
  }

  async onEnd(result) {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log('TEAMS_WEBHOOK_URL is not configured.');
      return;
    }

    const tests = Array.from(this.results.values());

    const passed = tests.filter(test => test.status === 'passed').length;
    const failed = tests.filter(test => test.status === 'failed').length;
    const skipped = tests.filter(test => test.status === 'skipped').length;
    const timedOut = tests.filter(test => test.status === 'timedOut').length;

    const status = result.status === 'passed'
      ? 'PASSED'
      : 'FAILED';

    const payload = {
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              {
                type: 'TextBlock',
                text: 'Playwright Test Results',
                weight: 'Bolder',
                size: 'Large'
              },
              {
                type: 'TextBlock',
                text: `Status: ${status}`,
                weight: 'Bolder'
              },
              {
                type: 'FactSet',
                facts: [
                  {
                    title: 'Passed',
                    value: String(passed)
                  },
                  {
                    title: 'Failed',
                    value: String(failed)
                  },
                  {
                    title: 'Skipped',
                    value: String(skipped)
                  },
                  {
                    title: 'Timed Out',
                    value: String(timedOut)
                  }
                ]
              }
            ]
          }
        }
      ]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(
          `Teams notification failed: ${response.status} ${response.statusText}`
        );
        return;
      }

      console.log('Teams notification sent successfully.');
    } catch (error) {
      console.error('Unable to send Teams notification:', error.message);
    }
  }
}

export default TeamsReporter;