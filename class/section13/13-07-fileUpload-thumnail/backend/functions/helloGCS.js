/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloGCS = (event, context) => {
  console.log(`안녕하세요 저는 트리거입니다.`);
  const gcsEvent = event;
  console.log(`Processing file: ${gcsEvent.name}`);
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`event: ${JSON.stringify(context)}`);
};
