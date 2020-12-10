import db_sqlite

# Proc to query variant tables and return the UNFILTERED variants from one specific sample:
# Queries the samples-table with sample name and joins the other tables on chr, pos, ref, alt
proc variantQuery*(db: DbConn, sample_id: string): seq[Row] =
  var rows: seq[Row] = db.getAllRows(sql"""SELECT DISTINCT samples.*, snpeff.*, group_concat(interps.class) AS classes, group_concat(interps.comment) AS comments FROM samples LEFT JOIN snpeff ON snpeff.positionID = samples.positionID LEFT JOIN  (SELECT DISTINCT * FROM interps INNER JOIN sessions ON sessions.sessionID = interps.sessionID GROUP BY interps.id) interps ON samples.positionID = interps.positionID WHERE sampleInfo_ID = ? GROUP BY samples.positionID""", sample_id)
  return rows
