drop policy "Admin edit content" on site_content;

create policy "Anon edit content"
  on site_content for all
  using (true)
  with check (true);
