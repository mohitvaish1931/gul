async function check() {
  const html = await fetch('https://gulfashion.store/shop').then(r => r.text());
  const jsurl = html.split('crossorigin src="')[1].split('"')[0];
  console.log('Script URL:', jsurl);
  const js = await fetch('https://gulfashion.store' + jsurl).then(r=>r.text());
  console.log('Contains localhost?', js.includes('localhost:5000'));
  console.log('Contains render?', js.includes('gul-275k.onrender.com'));
}
check().catch(console.error);
