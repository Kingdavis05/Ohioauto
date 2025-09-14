// Simple order processor example (run manually or via cron)
// This script reads 'automation_queue.json', simulates sending orders to suppliers,
// logs results to 'automation.log', and clears the queue.
const fs = require('fs');
const path = require('path');

const queueFile = path.join(__dirname, 'automation_queue.json');
const logFile = path.join(__dirname, 'automation.log');

if (!fs.existsSync(queueFile)) {
  console.log('No orders to process.');
  process.exit(0);
}
const queue = JSON.parse(fs.readFileSync(queueFile));
queue.forEach(order => {
  // Simulate supplier call (replace with real API call)
  const result = {
    orderId: order.id,
    status: 'ordered_at_supplier',
    supplierRef: 'SUP-' + order.id,
    timestamp: new Date().toISOString()
  };
  fs.appendFileSync(logFile, JSON.stringify(result) + '\n');
  console.log('Processed', order.id);
});
// remove queue
fs.unlinkSync(queueFile);
console.log('Done.');
