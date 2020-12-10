### TODO:
- [ ] In sessions table, user has to be replace with usr (special name)
- [ ] Sjekk hva getTableNames brukes til, og om den kan erstattes med noe
- [ ] Sjekk om det er komma som er delimiter i sqlite (eller semikolon.. Bytt evt ut)

### Testing postgres with jsfiddle:
* http://sqlfiddle.com/#!17/bf2fd/1  


#### Create:
´´´sh
# Create samples table:
create table samples (
    id                  serial primary key,
    positionID          text,
    sampleInfo_ID       text,
    interpretation_ID   text,
    hz                  int
);
# Create interps table:
create table interps (
    id              serial primary key,
    sessionID       VARCHAR(255) NOT NULL,
    positionID      VARCHAR(255) NOT NULL,
    comment         TEXT,
    class           VARCHAR(25),
    insDate         VARCHAR(255)
);
# Create snpeff table:
create table snpeff (
    id                 serial primary key,
    positionID         VARCHAR(255) NOT NULL,
    annotation         TEXT
);
# Create sessions table:
create table sessions (
    id                serial primary key,
    sessionID         VARCHAR(255) NOT NULL,
    usr               VARCHAR(255),
    openDate          VARCHAR(255),
    sample_ID         VARCHAR(255),
    signOffDate       VARCHAR(255),
    controlDate       VARCHAR(255),
    controlUser       VARCHAR(255),
    comment           TEXT
);



# Insert data:

insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('100', '1','1', 1);
insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('200', '1','1', 1);
insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('200', '2','1', 1);
insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('300', '1','1', 0);
insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('100', '2','1', 0);
insert into samples (positionID, sampleInfo_ID, interpretation_ID, hz) values ('400', '2','1', 1);

insert into snpeff (positionID, annotation) values ('100', 'gene1');
insert into snpeff (positionID, annotation) values ('200', 'gene2');
insert into snpeff (positionID, annotation) values ('300', 'gene3');

insert into interps (sessionID, positionID, comment, class) values ('1', '100', 'dette stinker', '3');
insert into interps (sessionID, positionID, comment, class) values ('1', '200', 'dette er bra', '4');

insert into sessions(sessionID, sample_ID, comment) values ('1', '1', 'bra tolka!')
insert into sessions(sessionID, sample_ID, comment) values ('2', '2', 'Tolkorama!')

´´´

#### Query string in sqlite:
´´´sh
SELECT DISTINCT
    samples.*, snpeff.*, group_concat(group_interp.class) 
AS classes, group_concat(group_interp.comment) AS comments, interp.class,interp.comment,(IFNULL(het.c, 0) || "\" || IFNULL(hom.c, 0)) as hethom FROM samples
LEFT JOIN snpeff ON snpeff.positionID = samples.positionID



LEFT JOIN (SELECT DISTINCT * FROM interps INNER JOIN sessions ON sessions.sessionID = interps.sessionID GROUP BY interps.id) group_interp ON samples.positionID = group_interp.positionID





LEFT JOIN (SELECT DISTINCT * FROM interps INNER JOIN sessions ON sessions.sessionID = interps.sessionID WHERE sessions.sample_ID = ? GROUP BY interps.id) interp ON samples.positionID = interp.positionID

LEFT JOIN (SELECT samples.positionID, samples.hz, COUNT(samples.hz) AS c FROM samples WHERE samples.hz = 1 AND samples.sampleInfo_ID = ? GROUP BY samples.positionID) hom ON samples.positionID = hom.positionID

LEFT JOIN (SELECT samples.positionID, samples.hz, COUNT(samples.hz) AS c FROM samples WHERE samples.hz = 0 AND samples.sampleInfo_ID = ? GROUP BY samples.positionID) het ON samples.positionID = het.positionID
WHERE sampleInfo_ID = ?

GROUP BY samples.positionID""", sample_id, sample_id, sample_id, sample_id)
´´´


#### Query string in postgresql:
´´´sh




SELECT DISTINCT
  samples.*, snpeff.*, group_interp.classes, group_interp.comments AS classes, interp.class, interp.comment,
  coalesce(hom.c, 0)::text || '\' || coalesce(het.c, 0)::text AS hethom
FROM 
  samples
LEFT JOIN
  snpeff
ON
  samples .positionID = snpeff.positionID
LEFT JOIN
    (SELECT DISTINCT
      interps.positionID, COUNT(interps.id), string_agg(interps.class, ',')
    AS
        classes, string_agg(interps.comment, ',') AS comments
    FROM
        interps
    GROUP BY
        interps.positionID)
AS
    group_interp
ON
    samples .positionID = group_interp.positionID
LEFT JOIN
    (
        SELECT DISTINCT
            interps.class, interps.comment, interps.positionID
        FROM
            interps
        INNER JOIN
            sessions
        ON
            sessions .sessionID = interps.sessionID
        WHERE
            sessions.sample_ID = '1'
        GROUP BY
            interps.id, sessions.id
    )
AS    
    interp
ON
    samples.positionID = interp.positionID
LEFT JOIN
    (
    SELECT
        samples.positionID, COUNT(samples.hz) AS c
    FROM
        samples
    WHERE
        samples.hz = 1
    GROUP BY
        samples.positionID
    )
AS
    hom
ON
    samples.positionID = hom.positionID
LEFT JOIN
    (
    SELECT
        samples.positionID, COUNT(samples.hz) AS c
    FROM
        samples
    WHERE
        samples.hz = 0
    GROUP BY
        samples.positionID
    )
AS
    het
ON
    samples.positionID = het.positionID
WHERE
  sampleinfo_id = '1'
GROUP BY
    samples.positionID

# Proc to query variant tables and return the UNFILTERED variants from one specific sample:
# Queries the samples-table with sample name and joins the other tables on chr, pos, ref, alt
proc variantQuery*(db: DbConn, sample_id: string): seq[Row] =
  var rows: seq[Row] = db.getAllRows(sql"""SELECT DISTINCT
  samples.*, snpeff.*, group_interp.classes, group_interp.comments AS classes, interp.class, interp.comment,
  coalesce(hom.c, 0)::text || '\' || coalesce(het.c, 0)::text AS hethom
FROM 
  samples
LEFT JOIN
  snpeff
ON
  samples .positionID = snpeff.positionID
LEFT JOIN
    (SELECT DISTINCT
      interps.positionID, COUNT(interps.id), string_agg(interps.class, ',')
    AS
        classes, string_agg(interps.comment, ',') AS comments
    FROM
        interps
    GROUP BY
        interps.positionID)
AS
    group_interp
ON
    samples .positionID = group_interp.positionID
LEFT JOIN
    (
        SELECT DISTINCT
            interps.class, interps.comment, interps.positionID
        FROM
            interps
        INNER JOIN
            sessions
        ON
            sessions .sessionID = interps.sessionID
        WHERE
            sessions.sample_ID = ?
        GROUP BY
            interps.id, sessions.id
    )
AS    
    interp
ON
    samples.positionID = interp.positionID
LEFT JOIN
    (
    SELECT
        samples.positionID, COUNT(samples.hz) AS c
    FROM
        samples
    WHERE
        samples.hz = 1
    GROUP BY
        samples.positionID
    )
AS
    hom
ON
    samples.positionID = hom.positionID
LEFT JOIN
    (
    SELECT
        samples.positionID, COUNT(samples.hz) AS c
    FROM
        samples
    WHERE
        samples.hz = 0
    GROUP BY
        samples.positionID
    )
AS
    het
ON
    samples.positionID = het.positionID
WHERE
  sampleinfo_id = ?
GROUP BY
    samples.positionID""", sample_id, sample_id)
return rows

´´´