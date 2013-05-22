var indexTemplate = {};


indexTemplate.indexList = [
    '<div class="text-center"><h2>Indices</h2></div>',
    '<div class="span11 center-table">',

    '<div id="toolbar" class="pull-right" style="padding-bottom: 10px;">',
    '<div class="btn-group">',
    '<a href="#refreshall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Refresh all Indices" ',
    'data-content="Makes all operations performed since the last refresh available for search. The (near) real-time capabilities depend on the index engine used. For example, the robin one requires refresh to be called, but by default a refresh is scheduled periodically."',
    '><i class="icon-refresh"></i> Refresh</a>',
    '<a href="#optimizeall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Optimize all Indices" ',
    'data-content="The optimize process basically optimizes the index for faster search operations (and relates to the number of segments a lucene index holds within each shard). The optimize operation allows to reduce the number of segments by merging them."',
    '><i class="icon-rocket"></i> Optimize</a>',
    '<a href="#flushall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Flush all Indices" ',
    'data-content="The flush process of an index basically frees memory from the index by flushing data to the index storage and clearing the internal transaction log. By default, ElasticSearch uses memory heuristics in order to automatically trigger flush operations as required in order to clear memory.">',
    '<i class="icon-rotate-right"></i> Flush</a>',
    '<a href="#clearcacheall" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Clear all Caches" data-content="Clears the cache on all indices."><i class="icon-eraser"></i> Clear Cache</a>',
    '</div> <!-- btn group -->',
    '</div> <!-- toolbar --> ',
    '<div id="indicesToolbar" class="pull-left" style="padding-bottom: 10px;">',
    //'<div class="btn-group">',
    '<a href="#createindex" class="btn" rel="popRight" data-trigger="hover" data-placement="bottom" data-title="Create Index" data-content="Create a New Index on your cluster."><i class="icon-edit"></i> Create Index</a>',
    //'</div> <!-- btn group -->',
    '</div> <!-- toolbar --> ',

    '<table class="table table-bordered table-striped table-hover" id="indicesTable">',
    '<thead>',
    '<tr><th>Index</th><th># Docs</th><th>Primary Size</th><th># Shards</th><th># Replicas</th><th>Status</th></tr>',
    '</thead>',
    '<tbody>',
    '<% _.each(indices, function(index) { %>',
    '<tr><td><a href="#index/<%- index.id %>"  rel="tipRight" data-placement="bottom" data-title="Index Information">',
    '<%- index.name %></a></td><td><%- index.docs.num_docs %></td><td><%- index.index.primary_size %></td><td><%- index.numshards %></td><td><%- index.numreplicas %></td><td><%- index.status %></td></tr>',
    '<% }); %>',
    '</tbody>',
    '</table>',
    '</div>'

].join("\n");

indexTemplate.indexView = [
    '<div class="text-center"><h2><%- indexName %></h2>',
    '<div class="span12 center-table">',
    '<ul class="nav nav-tabs">',
    '<li><a href="#metrics"  class="active" data-toggle="tab" id="indexTab">Metrics</a></li>',
    '<li><a href="#shards" data-toggle="tab">Shards</a></li>',
    '<li><a href="#administration" data-toggle="tab">Administration</a></li>',
    '</ul>',
    '<div class="tab-content">',
    '<div class="tab-pane active" id="metrics">',
    '<div class="row center-table">',

    '<div class="span3">',
    '<div class="well"><span class="stat-detail"><%- index.docs.num_docs %></span><span>Documents</span>',
    '</div></div>',
    '<div class="span3">',
    '<div class="well"><span class="stat-detail"><%- index.index.primary_size %></span><span>Primary Size</span>',
    '</div></div>',
    '<div class="span3">',
    '<div class="well"><span class="stat-detail"><%- index.index.size %></span><span>Total Size</span>',
    '</div></div>',
    '<div class="span3">',
    '<div class="well"><span class="stat-detail"><%- shards.total %></span><span>Total Shards</span>',
    '</div></div>',

    '</div>',

    '<div class="row center-table">',
    '<div class="span6"><h3>Documents</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Documents:</td><td><%- index.docs.num_docs %></td></tr>',
    '<tr><td>Max Documents:</td><td><%- index.docs.max_doc %></td></tr>',
    '<tr><td>Deleted Documents:</td><td><%- index.docs.deleted_docs %></td></tr>',
    '<tr><td>Primary Size:</td><td><%- index.index.primary_size %></td></tr>',
    '<tr><td>Total Size:</td><td><%- index.index.size %></td></tr>',
    '</table>',
    '</div>',
    '<div class="span6"><h3>Search Totals</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Query Total:</td><td><%- index.total.search.query_total %></td></tr>',
    '<tr><td>Query Time:</td><td><%- index.total.search.query_time %></td></tr>',
    '<tr><td>Fetch Total:</td><td><%- index.total.search.fetch_total %></td></tr>',
    '<tr><td>Fetch Time:</td><td><%- index.total.search.fetch_time %></td></tr>',
    '</table>',
    '</div>',
    '</div> <!-- end row -->',
    '<div class="row center-table">',
    '<div class="span6"><h3>Indexing Totals</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Index Total:</td><td><%- index.total.indexing.index_total %></td></tr>',
    '<tr><td class="span3">Index Time:</td><td><%- index.total.indexing.index_time %></td></tr>',
    '<tr><td>Delete Total:</td><td><%- index.total.indexing.delete_total %></td></tr>',
    '<tr><td>Delete Time:</td><td><%- index.total.indexing.delete_time %></td></tr>',
    '</table>',
    '</div>',
    '<div class="span6"><h3>Get Totals</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Get Total:</td><td><%- index.total.get.total %></td></tr>',
    '<tr><td>Get Time:</td><td><%- index.total.get.get_time %></td></tr>',
    '<tr><td>Exists Total:</td><td><%- index.total.get.exists_total %></td></tr>',
    '<tr><td>Exists Time:</td><td><%- index.total.get.exists_time %></td></tr>',
    '<tr><td>Missing Total:</td><td><%- index.total.get.missing_total %></td></tr>',
    '<tr><td>Missing Time:</td><td><%- index.total.get.missing_time %></td></tr>',
    '</table>',
    '</div>',
    '</div> <!-- end row -->',
    '<div class="row center-table">',
    '<div class="span6"><h3>Operations</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Refresh Total:</td><td><%- index.refresh.total %></td></tr>',
    '<tr><td class="span3">Refresh Time:</td><td><%- index.refresh.total_time %></td></tr>',
    '<tr><td>Flush Total:</td><td><%- index.flush.total %></td></tr>',
    '<tr><td>Flush Time:</td><td><%- index.flush.total_time %></td></tr>',
    '</table>',
    '</div>',
    '<div class="span6"><h3>Merge Activity</h3>',
    '<table class="table table-bordered table-striped">',
    '<tr><td class="span3">Merge Total:</td><td><%- index.merges.total %></td></tr>',
    '<tr><td>Merge Total Time:</td><td><%- index.merges.total_time %></td></tr>',
    '<tr><td>Merge Total Docs:</td><td><%- index.merges.total_docs %></td></tr>',
    '<tr><td>Merge Total Size:</td><td><%- index.merges.total_size %></td></tr>',
    '</table>',
    '</div>',
    '</div> <!-- end row -->',

    '</div> <!-- end tab -->',

    '<div class="tab-pane" id="shards">Coming Soon...</div>',
    '<div class="tab-pane" id="administration">',

    '<table class="table table-bordered table-striped">',
    '<tr><td><a href="#flushindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Flush Index</a></td><td>The flush process of an index frees memory from the index by flushing data to the index storage and clearing the internal transaction log. By default, ElasticSearch uses memory heuristics in order to automatically trigger flush operations as required in order to clear memory.</td></tr>',
    '<tr><td><a href="#clearcacheindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Clear Cache</a></td><td>Clears the cache on all indices.</td></tr>',
    '<tr><td><a href="#optimizeindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Optimize Index</a></td><td>The optimize process basically optimizes the index for faster search operations (and relates to the number of segments a lucene index holds within each shard). The optimize operation allows to reduce the number of segments by merging them.</td></tr>',
    '<tr><td><a href="#refreshindex/<%- indexId %>" class="btn btn-block" style="white-space: nowrap;">Refresh Index</a></td><td>Refresh the index, making all operations performed since the last refresh available for search. The (near) real-time capabilities depend on the index engine used. For example, the robin one requires refresh to be called, but by default a refresh is scheduled periodically.</td></tr>',
    '<% if (isOpenState == true) { %>',
    '<tr><td><a href="#closeindex/<%- indexId %>" class="btn btn-warning btn-block" style="white-space: nowrap;">Close Index</a></td>',
    '<% } else { %>',
    '<tr><td><a href="#openindex/<%- indexId %>" class="btn btn-danger btn-block" style="white-space: nowrap;">Open Index</a></td>',
    '<% } %>',
    '<td>The open and close index commands allow to close an index, and later on opening it. A closed index has almost no overhead on the cluster (except for maintaining its metadata), and is blocked for read/write operations. A closed index can be opened which will then go through the normal recovery process.</td></tr>',
    '<tr><td><a href="#deleteindex/<%- indexId %>" class="btn btn-danger" style="white-space: nowrap;">Delete Index</a></td><td><strong>WARNING! This action cannot be undone. You will destroy this index and all documents associated with this, by clicking this button.</strong></td></tr>',
    '</table>',
    '</div>',

    '</div>',
    '</div></div>'
].join("\n");