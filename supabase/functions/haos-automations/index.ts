import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  const { eventType, record, old_record } = await req.json();

  // 1. MOCK: Smart Waitlist Auto-Fill (Triggered on appointment cancellation/no-show)
  if (eventType === 'UPDATE' && record.table === 'appointments') {
    if (old_record.status === 'confirmed' && ['cancelled', 'no-show'].includes(record.status)) {
      console.log(`Appointment ${record.id} cancelled. Searching waitlist...`);
      // Find top person in waitlist for same department/date
      const { data: waitlistMatch } = await supabase
        .from('waitlist')
        .select('*')
        .eq('department', record.department)
        .eq('status', 'waiting')
        .order('waitlist_position', { ascending: true })
        .limit(1)
        .single();

      if (waitlistMatch) {
        console.log(`Found match: Patient ${waitlistMatch.patient_id}. Sending ${waitlistMatch.notification_channel} notification...`);
        // TODO: Call WhatsApp / Netgsm API here
      }
    }
  }

  // 2. MOCK: AI Document Summary (Triggered on new health_document upload)
  if (eventType === 'INSERT' && record.table === 'health_documents') {
    console.log(`New document uploaded: ${record.id}. Checking consent...`);
    
    // Fetch patient consent
    const { data: patient } = await supabase
      .from('patients')
      .select('ai_portal_consent')
      .eq('patient_id', record.patient_id)
      .single();

    if (patient?.ai_portal_consent) {
      console.log(`Consent granted. Calling Gemini API...`);
      // MOCK: Call Gemini API using GEMINI_API_KEY
      const mockSummary = "AI Summary generated via Gemini: The results indicate normal levels across all tested parameters.";
      
      // Update document with summary
      await supabase
        .from('health_documents')
        .update({ ai_summary: mockSummary })
        .eq('document_id', record.id);
    } else {
      console.log(`No AI consent for patient ${record.patient_id}. Skipping summary.`);
    }
  }

  return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
});
