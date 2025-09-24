<script>
function startAfter12() {
  document.getElementById('mainHeader').innerHTML = `
    <h1>Confused what to do after 12th?</h1>
    <p>Select your stream to get the best career recommendations.</p>
  `;
  document.getElementById('cardSection').style.display = 'none';
  document.getElementById('quizSection').style.display = 'none';
  document.getElementById('after12Section').style.display = 'block';
}

function selectStream(stream) {
  const container = document.getElementById('after12-options');
  let html = '';

  if (stream === 'science') {
    html = `
      <h3>Science Stream</h3>
      <p>Select your focus:</p>
      <button class="btn-quiz" onclick="showScienceOptions('maths')">PCM (Maths)</button>
      <button class="btn-quiz" onclick="showScienceOptions('biology')">PCB (Biology)</button>
    `;
  } else if (stream === 'commerce') {
    html = `
      <h3>Commerce Stream</h3>
      <ul>
        <li>B.Com (General / Honors)</li>
        <li>CA Foundation / CMA</li>
        <li>BBA / BMS</li>
        <li>Economics (Hons.)</li>
        <li>LLB (Law)</li>
      </ul>
    `;
  } else if (stream === 'arts') {
    html = `
      <h3>Arts Stream</h3>
      <ul>
        <li>BA (History / Political Science / Sociology / Psychology)</li>
        <li>BFA (Fine Arts)</li>
        <li>B.Ed (Teacher Training)</li>
        <li>Mass Communication & Journalism</li>
        <li>Hotel Management</li>
      </ul>
    `;
  } else if (stream === 'diploma') {
    html = `
      <h3>Diploma Holders</h3>
      <ul>
        <li>Lateral Entry B.Tech (Direct 2nd Year)</li>
        <li>AMIE (Engineering)</li>
        <li>Advanced Diploma / Specialization</li>
        <li>Competitive Exams for Govt Jobs</li>
      </ul>
    `;
  }

  container.innerHTML = html;
}

function showScienceOptions(type) {
  const container = document.getElementById('after12-options');
  if (type === 'maths') {
    container.innerHTML = `
      <h3>Science (PCM) Career Options</h3>
      <ul>
        <li>B.Tech / BE (Engineering)</li>
        <li>B.Sc (Maths / Physics / Chemistry)</li>
        <li>Architecture (B.Arch)</li>
        <li>Defence (NDA, CDS)</li>
        <li>Merchant Navy</li>
      </ul>
    `;
  } else {
    container.innerHTML = `
      <h3>Science (PCB) Career Options</h3>
      <ul>
        <li>MBBS / BDS / BHMS / BAMS</li>
        <li>B.Sc Nursing</li>
        <li>BPT (Physiotherapy)</li>
        <li>B.Sc (Biotech / Microbiology)</li>
        <li>Pharmacy (B.Pharm)</li>
      </ul>
    `;
  }
}
</script>
