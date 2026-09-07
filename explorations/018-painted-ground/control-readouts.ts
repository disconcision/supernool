/** Visible range values and an explicit, copyable snapshot of the live controls. */
export function setupControlReadouts(){
 for(const input of document.querySelectorAll<HTMLInputElement>('input[type="range"]')){
  const label=input.closest('label');if(!label||label.querySelector('output'))continue;
  const heading=document.createElement('span');heading.className='controlLabel';
  const name=document.createElement('span');
  while(label.firstChild&&label.firstChild!==input)name.append(label.firstChild);
  const output=document.createElement('output');output.className='controlValue';output.htmlFor=input.id;output.setAttribute('aria-hidden','true');
  heading.append(name,output);label.insertBefore(heading,input);
  const digits=Math.min(3,(input.step.split('.')[1]||'').length);
  const refresh=()=>{output.value=Number(input.value).toFixed(digits);input.setAttribute('aria-valuetext',output.value);};
  input.addEventListener('input',refresh);input.addEventListener('change',refresh);refresh();
 }
 const section=document.createElement('details');section.id='settingsSnapshot';
 const summary=document.createElement('summary');summary.textContent='Settings snapshot';
 const help=document.createElement('p');help.textContent='Capture the live sliders and options. Copy this when you want these exact settings used as defaults.';
 const button=document.createElement('button');button.type='button';button.textContent='Capture & copy settings';
 const text=document.createElement('textarea');text.readOnly=true;text.rows=9;text.setAttribute('aria-label','Captured settings');text.spellcheck=false;
 const status=document.createElement('small');status.setAttribute('role','status');
 const key='supernool-018-captured-settings';
 try{text.value=localStorage.getItem(key)||'';}catch{}
 text.hidden=!text.value;
 button.onclick=async()=>{
  const controls:Record<string,string|boolean>={};
  for(const input of document.querySelectorAll<HTMLInputElement|HTMLSelectElement>('.dock input:not([type="hidden"]),.dock select')){
   if(input.id)controls[input.id]=input instanceof HTMLInputElement&&input.type==='checkbox'?input.checked:input.value;
  }
  const rules=Array.from(document.querySelectorAll<HTMLInputElement>('#ruleList input[type="checkbox"]')).map(input=>({rule:input.closest('label')?.textContent?.trim(),enabled:input.checked}));
  text.value=JSON.stringify({study:'supernool/018',capturedAt:new Date().toISOString(),controls,rules},null,2);text.hidden=false;
  let saved=false;try{localStorage.setItem(key,text.value);saved=true;}catch{}
  try{await navigator.clipboard.writeText(text.value);status.textContent=saved?'Copied and saved in this browser.':'Copied.';}
  catch{status.textContent=saved?'Saved in this browser. Select the text below to copy it.':'Select the text below to copy it.';text.focus();text.select();}
 };
 section.append(summary,help,button,status,text);document.getElementById('settings')!.append(section);
}
