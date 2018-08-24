const template = `
<ul>
<% userList.forEach(function(item,index,array){ %>

    <li class="<%= ((item.Gid===curChatId)?'cur ':'') + (item.IsEmpty === 1 ? 'empty ' : 'unEmpty ') + (item.stared ? ' js-stared-li ' : '') %>"
        data-roleid="<%= item.Role %>" data-showgid="<%= item.ShowGid %>"
        data-copyGid="<%= item.CopyGid ? item.CopyGid : item.ShowGid %>" data-gid="<%= item.Gid %>"
        data-lastcontentid="<%= item.ContentID%>"
        data-biztype="<%=item.BizType%>"
        data-biztypeuid="<%=item.bizTypeUid%>"
    <%if(item.Role != "3"){%>
    data-name="<%= item.Name %>"
    <%}%>
    >
    <div class="cont cont01">
        <% if(batchQuit) { %>
            <% var clz = 'js-one-key-quit-group radio js-chat-del-radio'; %>
            <% if(item.batchQuitStatus === 0){clz = 'js-one-key-quit-group radio js-chat-del-radio' } %>
            <% if(item.batchQuitStatus === 1){clz = 'js-one-key-quit-group radio js-chat-del-radio cur'} %>
            <% if(item.batchQuitStatus === 2){clz = 'js-one-key-quit-group radio js-chat-del-radio unclick'} %>
            <i class="<%= clz %>" data-gid="<%= item.Gid %>"></i>
        <% } %>
        <a href="#" class="img"><img data-url="<%=item.Avatar%>" src="<%=item.Avatar%>" alt=""/>
            <span class="num_icon" style="<%= item.NewRecordAmount ?'display : block' : 'display : none' %>"><%=item.NewRecordAmount > 99 ? '99+' : item.NewRecordAmount%></span>
            <%= item.isOwner ? '<i class="ico_qunzhu"></i>' : '' %>
        </a>
        <span class="time"><s class="<%=item.stared ? 'star cur js-user-star-tag' : 'star js-user-star-tag' %>"
                              style="<%= item.stared ? 'display: inline-block;' : 'display: none;' %>"></s><%=item.formatedDate%></span>
        <div class="content01">
            <% var lastMsg; try{lastMsg = decodeURIComponent(item.LastMsg)}catch(e){lastMsg = item.LastMsg}%>
                <%if(item.Role !== 3){%>
                    <a title="<%=item.nameFormatted%>" href="#" class="team_name">
                        <%= item.nameFormatted%>
                    </a>
                    <% if(item.AtRecordAmount){%>
                        <p class="tips" style="color:#fc645"><%= item.AtRecordAmount + '条@你' %></p>
                    <% } else {%>
                    <p class="tips" style="<%= item.IsHighlight ? 'color :#fc645' : 'color : #666'%>"><%= lastMsg.replace(/</g, '&lt;').replace(/>/g,
                        '&gt;') %></p>
                    <%} %>
                <%} else {%>
                <%if(!isReadUidAuth){ %>
                    <a title="<%=item.nameFormatted ? item.nameFormatted : encodingUid(item.ShowGid)%>"
                        href="#"
                        class="team_name">
                        <%= item.nameFormatted ? item.nameFormatted :encodingUid(item.ShowGid) %>
                    </a>
                    <p class="tips" style="<%= item.IsHighlight ? 'color :#fc645' : 'color : #666'%>"><%= lastMsg.replace(/</g, '&lt;').replace(/>/g,
                        '&gt;') %>
                    </p>
                <%} else {%>
                    <a title="<%= item.nameFormatted ? item.nameFormatted : encodingUid(item.ShowGid) %>"
                    href="#" class="team_name">
                        <%= item.nameFormatted ? item.nameFormatted :encodingUid(item.ShowGid)%>
                    </a>
                    <p class="tips" style="<%= item.IsHighlight ? 'color :#fc645' : 'color : #666'%>"><%= lastMsg.replace(/</g, '&lt;').replace(/>/g,
                        '&gt;') %></p>
                <%}%>
            <%}%>
        </div>
    </div>
    </li>
    <% });%>
    <ul>
`


export default template