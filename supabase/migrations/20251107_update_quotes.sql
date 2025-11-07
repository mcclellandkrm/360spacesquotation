-- Modify quotes table to store hosting plan as JSON
ALTER TABLE quotes 
DROP COLUMN hosting_plan_id,
ADD COLUMN hosting_plan jsonb;