"use strict";define("ilios-embeded/adapters/application",["exports","ember-data","ember"],function(e,t,n){var i=n["default"].computed;e["default"]=t["default"].RESTAdapter.extend({iliosCalendarConfig:n["default"].inject.service(),session:n["default"].inject.service(),host:i.alias("iliosCalendarConfig.apiServer"),namespace:"api/v1",coalesceFindRequests:!0,headers:i("session.jwt",function(){return{"X-JWT-Authorization":"Token "+this.get("session.jwt")}}),findMany:function(e,t,n,i){var a=this.urlForFindMany(n,t.modelName,i);return this.ajax(a,"GET",{data:{filters:{id:n},limit:1e6}})},pathForType:function(e){return n["default"].String.pluralize(e.camelize().toLowerCase())}})}),define("ilios-embeded/app",["exports","ember","ember/resolver","ember/load-initializers","ilios-embeded/config/environment"],function(e,t,n,i,a){var o;t["default"].MODEL_FACTORY_INJECTIONS=!0,o=t["default"].Application.extend({modulePrefix:a["default"].modulePrefix,podModulePrefix:a["default"].podModulePrefix,Resolver:n["default"]}),i["default"](o,a["default"].modulePrefix),e["default"]=o}),define("ilios-embeded/components/app-version",["exports","ember-cli-app-version/components/app-version","ilios-embeded/config/environment"],function(e,t,n){var i=n["default"].APP,a=i.name,o=i.version;e["default"]=t["default"].extend({version:o,name:a})}),define("ilios-embeded/components/calendar-event",["exports","el-calendar/components/calendar-event"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/copy-button",["exports","ember-cli-clipboard/components/copy-button"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/el-daily-calendar",["exports","el-calendar/components/el-daily-calendar"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/el-monthly-calendar",["exports","el-calendar/components/el-monthly-calendar"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/el-weekly-calendar",["exports","el-calendar/components/el-weekly-calendar"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ics-feed",["exports","ilios-calendar/components/ics-feed"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-day",["exports","ilios-calendar/components/ilios-calendar-day"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-event-month",["exports","ilios-calendar/components/ilios-calendar-event-month"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-event",["exports","ilios-calendar/components/ilios-calendar-event"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-month",["exports","ilios-calendar/components/ilios-calendar-month"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-single-event-learningmaterial-list",["exports","ilios-calendar/components/ilios-calendar-single-event-learningmaterial-list"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-single-event-objective-list",["exports","ilios-calendar/components/ilios-calendar-single-event-objective-list"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-single-event",["exports","ilios-calendar/components/ilios-calendar-single-event"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar-week",["exports","ilios-calendar/components/ilios-calendar-week"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/ilios-calendar",["exports","ilios-calendar/components/ilios-calendar"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/components/tooltip-on-parent",["exports","ember-tooltips/components/tooltip-on-parent"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("ilios-embeded/controllers/calendar",["exports","ember","ember-data","ic-ajax","moment","ember-moment/computeds/format"],function(e,t,n,i,a,o){var s=t["default"].computed,r=t["default"].RSVP,l=t["default"].Controller,d=t["default"].inject,u=t["default"].isEmpty,c=n["default"].PromiseArray,f=n["default"].PromiseObject,m=s.notEmpty;e["default"]=l.extend({iliosCalendarConfig:d.service(),selectedView:"week",selectedDate:new Date,selectedEvent:null,fromTimeStamp:s("selectedDate","selectedView",function(){return a["default"](this.get("selectedDate")).startOf(this.get("selectedView")).unix()}),toTimeStamp:s("selectedDate","selectedView",function(){return a["default"](this.get("selectedDate")).endOf(this.get("selectedView")).unix()}),calendarEvents:s("model","fromTimeStamp","toTimeStamp",function(){var e=r.defer(),t=this.get("model.userId"),n=this.get("model.jwt"),o=this.get("iliosCalendarConfig").get("userEventsUrl")+"/"+t+"?from="+this.get("fromTimeStamp")+"&to="+this.get("toTimeStamp");return i["default"]({url:o,beforeSend:function(e){e.setRequestHeader("X-JWT-Authorization","Token "+n)}}).then(function(t){var n=t.userEvents.sortBy("startDate").map(function(e){var t="U"+a["default"](e.startDate).format("YYYYMMDD");return e.offering&&(t+="O"+e.offering),e.ilmSession&&(t+="I"+e.ilmSession),e.slug=t,e});e.resolve(n)}),c.create({promise:e.promise})}),absoluteIcsUri:s("model.userId",function(){var e=this,t=r.defer(),n=this.get("model.userId"),a=this.get("model.jwt"),o=this.get("iliosCalendarConfig").get("userDetailsUrl")+"/"+n;return i["default"]({url:o,beforeSend:function(e){e.setRequestHeader("X-JWT-Authorization","Token "+a)}}).then(function(n){var i=n.users[0].icsFeedKey,a=e.get("iliosCalendarConfig").get("icsUrl")+"/"+i;t.resolve(a)}),f.create({promise:t.promise})}),description:s("thesession.description.description",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("sessionDescription").then(function(t){u(t)?e.resolve(null):e.resolve(t.get("description"))})}),f.create({promise:e.promise})}),isOffering:m("selectedEvent.offering"),niceStartTime:o["default"]("selectedEvent.startDate","dddd, MMMM Do YYYY, h:mm a"),offeredAt:s("niceStartTime",function(){return"Offered At "+this.get("niceStartTime")}),instructorList:s("isOffering","offering.allInstructors.[]",function(){var e=r.defer(),t=this.get("isOffering")?"offering":"ilmSession";return this.get(t).then(function(t){t.get("allInstructors").then(function(t){var n=t.sortBy("lastName").mapBy("fullName");e.resolve(n.join(", "))})}),f.create({promise:e.promise})}),taughtBy:s("instructorList",function(){var e=r.defer();return this.get("instructorList").then(function(t){e.resolve("Taught by "+t)}),f.create({promise:e.promise})}),sessionIs:s("thesession.sessionType",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("sessionType").then(function(t){e.resolve("This Session is "+t.get("title"))})}),f.create({promise:e.promise})}),offering:s("selectedEvent.offering",function(){var e=this.get("selectedEvent.offering");return e?f.create({promise:this.get("store").findRecord("offering",e)}):null}),ilmSession:s("selectedEvent.ilmSession",function(){var e=this.get("selectedEvent.ilmSession");return e?f.create({promise:this.get("store").findRecord("ilm-session",e)}):null}),courseObjectives:s("thesession.course.objectives.@each.topParents.[]",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("course").then(function(t){t.get("objectives").then(function(t){var n=[],i=[];t.forEach(function(e){n.pushObject(e.get("topParents").then(function(t){var a=t.get("firstObject");n.pushObject(a.get("competency").then(function(t){var a=e.get("title").replace(/(<([^>]+)>)/gi,"");u(t)?i.pushObject({title:a,domain:"No Associated Competencies"}):n.pushObject(t.get("domain").then(function(e){i.pushObject({title:a,domain:t.get("title")+" ("+e.get("title")+")"})}))}))}))}),r.all(n).then(function(){e.resolve(i)})})})}),c.create({promise:e.promise})}),courseLearningMaterials:s("thesession.course.learningMaterials.@each.learningMaterial.[title,absoluteFileUri]",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("course").then(function(t){t.get("learningMaterials").then(function(t){var n=[],i=[];t.forEach(function(e){n.pushObject(e.get("learningMaterial").then(function(t){i.pushObject({title:t.get("title"),description:t.get("description"),required:e.get("required"),notes:e.get("publicNotes"),url:t.get("url"),type:t.get("type"),mimetype:t.get("mimetype"),filesize:t.get("filesize"),citation:t.get("citation")})}))}),r.all(n).then(function(){e.resolve(i)})})})}),c.create({promise:e.promise})}),sessionObjectives:s("thesession.objectives.@each.topParents.[]",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("objectives").then(function(t){var n=[],i=[];t.forEach(function(e){n.pushObject(e.get("topParents").then(function(t){var a=t.get("firstObject");n.pushObject(a.get("competency").then(function(t){var a=e.get("title").replace(/(<([^>]+)>)/gi,"");u(t)?i.pushObject({title:a,domain:"No Associated Competencies"}):n.pushObject(t.get("domain").then(function(e){i.pushObject({title:a,domain:t.get("title")+" ("+e.get("title")+")"})}))}))}))}),r.all(n).then(function(){e.resolve(i)})})}),c.create({promise:e.promise})}),sessionLearningMaterials:s("thesession.learningMaterials.@each.learningMaterial.[title,absoluteFileUri]",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("learningMaterials").then(function(t){var n=[],i=[];t.forEach(function(e){n.pushObject(e.get("learningMaterial").then(function(t){i.pushObject({title:t.get("title"),description:t.get("description"),required:e.get("required"),notes:e.get("publicNotes"),url:t.get("url"),type:t.get("type"),mimetype:t.get("mimetype"),filesize:t.get("filesize"),citation:t.get("citation")})}))}),r.all(n).then(function(){e.resolve(i)})})}),c.create({promise:e.promise})}),course:s("thesession.course",function(){var e=r.defer();return this.get("thesession").then(function(t){t.get("course").then(function(t){e.resolve(t)})}),f.create({promise:e.promise})}),sessionTitle:s("thesession.title","isOffering",function(){var e=r.defer(),t=this.get("isOffering")?"":"ILM: ";return this.get("thesession").then(function(n){e.resolve(t+n.get("title"))}),f.create({promise:e.promise})}),thesession:s("offering.session","ilmSession.session",function(){var e=r.defer(),t=this.get("isOffering")?"offering":"ilmSession";return this.get(t).then(function(t){t.get("session").then(function(t){e.resolve(t)})}),f.create({promise:e.promise})}),actions:{changeDate:function(e){this.set("selectedDate",a["default"](e).format("YYYY-MM-DD"))},changeView:function(e){this.set("selectedView",e)},selectEvent:function(e){this.set("selectedEvent",e)},backToCalendar:function(){this.set("selectedEvent",!1)}}})}),define("ilios-embeded/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("ilios-embeded/helpers/fa-icon",["exports","ember-cli-font-awesome/helpers/fa-icon"],function(e,t){e["default"]=t["default"],e.faIcon=t.faIcon}),define("ilios-embeded/helpers/filesize",["exports","ilios-calendar/helpers/filesize"],function(e,t){e["default"]=t["default"],e.filesize=t.filesize}),define("ilios-embeded/helpers/formatted-date",["exports","el-calendar/helpers/formatted-date"],function(e,t){e["default"]=t["default"],e.formattedDate=t.formattedDate}),define("ilios-embeded/helpers/moment-duration",["exports","ember-moment/helpers/moment-duration"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/helpers/moment-format",["exports","ember","ilios-embeded/config/environment","ember-moment/helpers/moment-format"],function(e,t,n,i){e["default"]=i["default"].extend({globalOutputFormat:t["default"].get(n["default"],"moment.outputFormat"),globalAllowEmpty:!!t["default"].get(n["default"],"moment.allowEmpty")})}),define("ilios-embeded/helpers/moment-from-now",["exports","ember","ilios-embeded/config/environment","ember-moment/helpers/moment-from-now"],function(e,t,n,i){e["default"]=i["default"].extend({globalAllowEmpty:!!t["default"].get(n["default"],"moment.allowEmpty")})}),define("ilios-embeded/helpers/moment-to-now",["exports","ember","ilios-embeded/config/environment","ember-moment/helpers/moment-to-now"],function(e,t,n,i){e["default"]=i["default"].extend({globalAllowEmpty:!!t["default"].get(n["default"],"moment.allowEmpty")})}),define("ilios-embeded/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ilios-embeded/config/environment"],function(e,t,n){var i=n["default"].APP,a=i.name,o=i.version;e["default"]={name:"App Version",initialize:t["default"](a,o)}}),define("ilios-embeded/initializers/ember-tooltips",["exports","ember","ilios-embeded/config/environment","ilios-embeded/mixins/components/tooltips"],function(e,t,n,i){function a(){var e={addTo:["Component","View"]},a=n["default"].tooltips||{},o=t["default"].merge(e,a);"array"===t["default"].typeOf(o.addTo)&&o.addTo.forEach(function(e){t["default"][e].reopen(i["default"])})}e.initialize=a,e["default"]={name:"ember-tooltips",initialize:a}}),define("ilios-embeded/initializers/export-application-global",["exports","ember","ilios-embeded/config/environment"],function(e,t,n){function i(){var e=arguments[1]||arguments[0];if(n["default"].exportApplicationGlobal!==!1){var i,a=n["default"].exportApplicationGlobal;i="string"==typeof a?a:t["default"].String.classify(n["default"].modulePrefix),window[i]||(window[i]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[i]}}))}}e.initialize=i,e["default"]={name:"export-application-global",initialize:i}}),define("ilios-embeded/mixins/components/tooltips",["exports","ember-tooltips/mixins/components/tooltips"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/models/competency",["exports","ember-data","ember"],function(e,t,n){e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),objectives:t["default"].hasMany("objective",{async:!0}),parent:t["default"].belongsTo("competency",{async:!0,inverse:"children"}),children:t["default"].hasMany("competency",{async:!0,inverse:"parent"}),isDomain:n["default"].computed.empty("parent.content"),domain:function(){var e=this,i=new n["default"].RSVP.Promise(function(t){e.get("parent").then(function(n){n?n.get("domain").then(function(e){return t(e)}):t(e)})});return t["default"].PromiseObject.create({promise:i})}.property("parent","parent.domain")})}),define("ilios-embeded/models/course-learning-material",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({notes:t["default"].attr("string"),required:t["default"].attr("boolean"),publicNotes:t["default"].attr("boolean"),course:t["default"].belongsTo("course",{async:!0}),learningMaterial:t["default"].belongsTo("learning-material",{async:!0}),meshDescriptors:t["default"].hasMany("mesh-descriptors",{async:!0})})}),define("ilios-embeded/models/course",["exports","ember-data"],function(e,t){var n=t["default"].Model.extend({title:t["default"].attr("string"),level:t["default"].attr("number"),objectives:t["default"].hasMany("objective",{async:!0}),meshDescriptors:t["default"].hasMany("mesh-descriptor",{async:!0}),learningMaterials:t["default"].hasMany("course-learning-material",{async:!0}),sessions:t["default"].hasMany("session",{async:!0})});e["default"]=n}),define("ilios-embeded/models/instructor-group",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),ilmSessions:t["default"].hasMany("ilm-session",{async:!0}),users:t["default"].hasMany("user",{async:!0}),offerings:t["default"].hasMany("offering",{async:!0})})}),define("ilios-embeded/models/learning-material-status",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({title:t["default"].attr("string")})}),define("ilios-embeded/models/learning-material-user-role",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({title:t["default"].attr("string")})}),define("ilios-embeded/models/learning-material",["exports","ember-data","ember"],function(e,t,n){var i=n["default"].computed;e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),description:t["default"].attr("string"),uploadDate:t["default"].attr("date"),originalAuthor:t["default"].attr("string"),userRole:t["default"].belongsTo("learning-material-user-role",{async:!0}),status:t["default"].belongsTo("learning-material-status",{async:!0}),owningUser:t["default"].belongsTo("user",{async:!0}),sessionLearningMaterials:t["default"].hasMany("session-learning-material",{async:!0}),courseLearningMaterials:t["default"].hasMany("course-learning-material",{async:!0}),citation:t["default"].attr("string"),copyrightPermission:t["default"].attr("boolean"),copyrightRationale:t["default"].attr("string"),filename:t["default"].attr("string"),mimetype:t["default"].attr("string"),filesize:t["default"].attr("number"),link:t["default"].attr("string"),absoluteFileUri:t["default"].attr("string"),type:i("filename","citation","link",function(){return this.get("filename")?"file":this.get("citation")?"citation":this.get("link")?"link":void 0}),fileHash:null,url:i("link","citation","absoluteFileUri",function(){return"file"===this.get("type")?this.get("absoluteFileUri"):"link"===this.get("type")?this.get("link"):"citation"===this.get("type")?null:void 0}),isFile:i("type",function(){return"file"===this.get("type")}),isLink:i("type",function(){return"link"===this.get("type")}),isCitation:i("type",function(){return"citation"===this.get("type")})})}),define("ilios-embeded/models/mesh-descriptor",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({name:t["default"].attr("string"),annotation:t["default"].attr("string"),createdAt:t["default"].attr("date"),updatedAt:t["default"].attr("date"),courses:t["default"].hasMany("course",{async:!0}),objectives:t["default"].hasMany("objectives",{async:!0}),sessions:t["default"].hasMany("session",{async:!0}),concepts:t["default"].hasMany("mesh-concept",{async:!0}),qualifiers:t["default"].hasMany("mesh-qualifier",{async:!0}),trees:t["default"].hasMany("mesh-tree",{async:!0}),sessionLearningMaterials:t["default"].hasMany("session-learning-material",{async:!0}),courseLearningMaterials:t["default"].hasMany("course-learning-material",{async:!0}),previousIndexing:t["default"].belongsTo("mesh-previous-indexing",{async:!0})})}),define("ilios-embeded/models/objective",["exports","ember-data","ember"],function(e,t,n){var i=n["default"].computed,a=n["default"].RSVP,o=n["default"].isEmpty,s=i.gt,r=i.gte;e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),competency:t["default"].belongsTo("competency",{async:!0}),courses:t["default"].hasMany("course",{async:!0}),sessions:t["default"].hasMany("session",{async:!0}),parents:t["default"].hasMany("objective",{inverse:"children",async:!0}),children:t["default"].hasMany("objective",{inverse:"parents",async:!0}),meshDescriptors:t["default"].hasMany("mesh-descriptor",{async:!0}),hasMultipleParents:s("parents.length",1),hasParents:r("parents.length",1),treeCompetencies:i("competency","parents.@each.treeCompetencies.[]",function(){var e=a.defer(),i=this;return this.get("competency").then(function(t){i.get("parents").then(function(i){var a=i.getEach("treeCompetencies");n["default"].RSVP.all(a).then(function(n){var i=n.reduce(function(e,t){return e.pushObjects(t.toArray())},[]);i.pushObject(t),i=i.uniq().filter(function(e){return null!=e}),e.resolve(i)})})}),t["default"].PromiseArray.create({promise:e.promise})}),topParents:i("parents.[]",function(){var e=this,n=a.defer();return this.get("parents").then(function(t){o(t)&&n.resolve([e]);var i=[],s=[];t.forEach(function(e){s.pushObject(e.get("topParents").then(function(e){i.pushObjects(e.toArray())}))}),a.all(s).then(function(){n.resolve(i)})}),t["default"].PromiseArray.create({promise:n.promise})}),shortTitle:function(){var e=this.get("title");return void 0===e?"":e.substr(0,200)}.property("title"),textTitle:function(){var e=this.get("title");return void 0===e?"":e.replace(/(<([^>]+)>)/gi,"")}.property("title")})}),define("ilios-embeded/models/offering",["exports","ember-data","ember"],function(e,t,n){var i=n["default"].computed,a=n["default"].RSVP,o=t["default"].PromiseArray;e["default"]=t["default"].Model.extend({room:t["default"].attr("string"),startDate:t["default"].attr("date"),endDate:t["default"].attr("date"),updatedAt:t["default"].attr("date"),session:t["default"].belongsTo("session",{async:!0}),instructorGroups:t["default"].hasMany("instructor-group",{async:!0}),instructors:t["default"].hasMany("user",{async:!0,inverse:"instructedOfferings"}),allInstructors:i("instructors.[]","instructorsGroups.@each.users.[]",function(){var e=this,t=n["default"].RSVP.defer();return this.get("instructorGroups").then(function(n){var i=n.getEach("users");i.pushObject(e.get("instructors")),a.all(i).then(function(e){var n=e.reduce(function(e,t){return e.pushObjects(t.toArray())},[]);n=n.uniq().sortBy("lastName","firstName"),t.resolve(n)})}),o.create({promise:t.promise})})})}),define("ilios-embeded/models/session-description",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({description:t["default"].attr("string"),session:t["default"].belongsTo("session",{async:!0})})}),define("ilios-embeded/models/session-learning-material",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({notes:t["default"].attr("string"),required:t["default"].attr("boolean"),publicNotes:t["default"].attr("boolean"),session:t["default"].belongsTo("session",{async:!0}),learningMaterial:t["default"].belongsTo("learning-material",{async:!0}),meshDescriptors:t["default"].hasMany("mesh-descriptors",{async:!0})})}),define("ilios-embeded/models/session-type",["exports","ember-data"],function(e,t){e["default"]=t["default"].Model.extend({title:t["default"].attr("string"),sessionTypeCssClass:t["default"].attr("string"),sessions:t["default"].hasMany("session",{async:!0})})}),define("ilios-embeded/models/session",["exports","ember-data"],function(e,t){var n=t["default"].Model.extend({title:t["default"].attr("string"),attireRequired:t["default"].attr("boolean"),equipmentRequired:t["default"].attr("boolean"),supplemental:t["default"].attr("boolean"),updatedAt:t["default"].attr("date"),sessionType:t["default"].belongsTo("session-type",{async:!0}),course:t["default"].belongsTo("course",{async:!0}),ilmSession:t["default"].belongsTo("ilm-session",{async:!0}),objectives:t["default"].hasMany("objective",{async:!0}),meshDescriptors:t["default"].hasMany("mesh-descriptor",{async:!0}),sessionDescription:t["default"].belongsTo("session-description",{async:!0}),learningMaterials:t["default"].hasMany("session-learning-material",{async:!0}),offerings:t["default"].hasMany("offering",{async:!0})});e["default"]=n}),define("ilios-embeded/models/user",["exports","ember-data"],function(e,t){var n=t["default"].Model.extend({lastName:t["default"].attr("string"),firstName:t["default"].attr("string"),middleName:t["default"].attr("string"),icsFeedKey:t["default"].attr("string"),instructorGroups:t["default"].hasMany("instructor-group",{async:!0,inverse:"users"}),instructedOfferings:t["default"].hasMany("offering",{async:!0,inverse:"instructors"})});e["default"]=n}),define("ilios-embeded/router",["exports","ember","ilios-embeded/config/environment"],function(e,t,n){var i=t["default"].Router.extend({location:n["default"].locationType});i.map(function(){this.route("unsupportedAuthenticationConfiguration"),this.route("calendar"),this.route("noAccount")}),e["default"]=i}),define("ilios-embeded/routes/calendar",["exports","ember"],function(e,t){var n=t["default"].RSVP,i=t["default"].Route,a=t["default"].inject,o=a.service;e["default"]=i.extend({iliosCalendarConfig:a.service(),session:o(),model:function(){var e=this,t=n.defer(),i=this.get("session");return i.get("isAuthenticationSupported").then(function(n){return n?void i.get("authenticatedSession").then(function(n){return n?(i.set("jwt",n.jwt),void t.resolve({userId:n.userId,jwt:n.jwt})):void e.transitionTo("noAccount")}):void e.transitionTo("unsupportedAuthenticationConfiguration")}),t.promise}})}),define("ilios-embeded/routes/index",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({beforeModel:function(){this.transitionTo("calendar")}})}),define("ilios-embeded/routes/no-account",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({})}),define("ilios-embeded/routes/unsupported-authentication-configuration",["exports","ember"],function(e,t){e["default"]=t["default"].Route.extend({})}),define("ilios-embeded/services/ilios-calendar-config",["exports","ember","ilios-embeded/config/environment"],function(e,t,n){e["default"]=t["default"].Service.extend({environment:n["default"].environment,apiServer:t["default"].computed("environment",function(){return"adevelopment"===this.get("environment")?"":"https://ilios-stage.ucsf.edu"}),loginPath:"/auth/login",configPath:"/auth/config",userEventsPath:"/api/v1/userevents",userDetailsPath:"/api/v1/users",icsPath:"/ics",loginUrl:t["default"].computed("apiServer","loginPath",function(){return this.get("apiServer")+this.get("loginPath")}),configUrl:t["default"].computed("apiServer","configPath",function(){return this.get("apiServer")+this.get("configPath")}),userEventsUrl:t["default"].computed("apiServer","userEventsPath",function(){return this.get("apiServer")+this.get("userEventsPath")}),userDetailsUrl:t["default"].computed("apiServer","userDetailsPath",function(){return this.get("apiServer")+this.get("userDetailsPath")}),icsUrl:t["default"].computed("apiServer","icsPath",function(){return this.get("apiServer")+this.get("icsPath")})})}),define("ilios-embeded/services/moment",["exports","ember","moment"],function(e,t,n){var i=t["default"].computed;e["default"]=t["default"].Service.extend({_locale:null,_timeZone:null,locale:i({get:function(){return this.get("_locale")},set:function(e,t){return this.set("_locale",t),t}}),timeZone:i({get:function(){return this.get("_timeZone")},set:function(e,i){return n["default"].tz?(this.set("_timeZone",i),i):void t["default"].Logger.warn("[ember-moment] attempted to set timezone, but moment-timezone unavailable.")}}),changeLocale:function(e){this.set("locale",e)},changeTimeZone:function(e){this.set("timeZone",e)},moment:function(){var e=n["default"].apply(void 0,arguments),t=this.get("locale"),i=this.get("timeZone");return t&&(e=e.locale(t)),i&&e.tz&&(e=e.tz(i)),e}})}),define("ilios-embeded/services/session",["exports","ember","ic-ajax"],function(e,t,n){e["default"]=t["default"].Service.extend({iliosCalendarConfig:t["default"].inject.service(),jwt:null,authenticationConfiguration:t["default"].computed(function(){var e=t["default"].RSVP.defer(),i=this.get("iliosCalendarConfig").get("configUrl");return n["default"](i).then(function(t){e.resolve(t.config)}),e.promise}),isAuthenticationSupported:t["default"].computed("authenticationConfiguration",function(){var e=this;return new t["default"].RSVP.Promise(function(t){e.get("authenticationConfiguration").then(function(e){t("shibboleth"===e.type)})})}),authenticatedSession:t["default"].computed("authenticationConfiguration",function(){var e=this,i=t["default"].RSVP.defer();return this.get("authenticationConfiguration").then(function(a){if("shibboleth"!==a.type)return void i.resolve(!1);var o=e.get("iliosCalendarConfig").get("loginUrl");n["default"]({url:o,xhrFields:{withCredentials:!0}}).then(function(e){if("redirect"===e.status)return void i.resolve(!1);if("noAccountExists"===e.status)return void i.resolve(!1);if("success"===e.status){var n=e.jwt,a=atob(n.split(".")[1]),o=t["default"].$.parseJSON(a);i.resolve({userId:o.user_id,jwt:n})}})}),i.promise})})}),define("ilios-embeded/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"ilios-embeded/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var i=new Array(1);return i[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),i},statements:[["content","outlet",["loc",[null,[1,0],[1,10]]]]],locals:[],templates:[]}}())}),define("ilios-embeded/templates/calendar",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:11,column:0}},moduleName:"ilios-embeded/templates/calendar.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var i=new Array(1);return i[0]=e.createMorphAt(t,1,1,n),i},statements:[["inline","ilios-calendar",[],["calendarEventsPromise",["subexpr","@mut",[["get","calendarEvents",["loc",[null,[3,27],[3,41]]]]],[],[]],"selectedDate",["subexpr","@mut",[["get","selectedDate",["loc",[null,[4,18],[4,30]]]]],[],[]],"selectedView",["subexpr","@mut",[["get","selectedView",["loc",[null,[5,18],[5,30]]]]],[],[]],"changeDate","changeDate","changeView","changeView","selectEvent","selectEvent","icsFeedUrl",["subexpr","@mut",[["get","absoluteIcsUri.content",["loc",[null,[9,16],[9,38]]]]],[],[]]],["loc",[null,[2,2],[10,4]]]]],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:11,column:0},end:{line:22,column:0}},moduleName:"ilios-embeded/templates/calendar.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("  ");e.appendChild(t,n);var n=e.createElement("button"),i=e.createTextNode("Back to Calendar");e.appendChild(n,i),e.appendChild(t,n);var n=e.createTextNode("\n  ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var i=e.childAt(t,[1]),a=new Array(2);return a[0]=e.createElementMorph(i),a[1]=e.createMorphAt(t,3,3,n),a},statements:[["element","action",["backToCalendar"],[],["loc",[null,[12,10],[12,37]]]],["inline","ilios-calendar-single-event",[],["courseTitle",["subexpr","@mut",[["get","course.title",["loc",[null,[14,16],[14,28]]]]],[],[]],"sessionTitle",["subexpr","@mut",[["get","sessionTitle.content",["loc",[null,[15,17],[15,37]]]]],[],[]],"description",["subexpr","@mut",[["get","description.content",["loc",[null,[16,16],[16,35]]]]],[],[]],"courseObjectives",["subexpr","@mut",[["get","courseObjectives",["loc",[null,[17,21],[17,37]]]]],[],[]],"courseLearningMaterials",["subexpr","@mut",[["get","courseLearningMaterials",["loc",[null,[18,28],[18,51]]]]],[],[]],"sessionObjectives",["subexpr","@mut",[["get","sessionObjectives",["loc",[null,[19,22],[19,39]]]]],[],[]],"sessionLearningMaterials",["subexpr","@mut",[["get","sessionLearningMaterials",["loc",[null,[20,29],[20,53]]]]],[],[]]],["loc",[null,[13,2],[21,4]]]]],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:23,column:0}},moduleName:"ilios-embeded/templates/calendar.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var i=new Array(1);return i[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),e.insertBoundary(t,null),i},statements:[["block","unless",[["get","selectedEvent",["loc",[null,[1,10],[1,23]]]]],[],0,1,["loc",[null,[1,0],[22,11]]]]],
locals:[],templates:[e,t]}}())}),define("ilios-embeded/templates/index",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"ilios-embeded/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var i=new Array(1);return i[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),i},statements:[["content","outlet",["loc",[null,[1,0],[1,10]]]]],locals:[],templates:[]}}())}),define("ilios-embeded/templates/no-account",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"ilios-embeded/templates/no-account.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("There is a problem with your account and we are unable to display your calendar at this time.\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("ilios-embeded/templates/unsupported-authentication-configuration",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"ilios-embeded/templates/unsupported-authentication-configuration.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("Unsupported Authentication Configuration\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("ilios-embeded/utils/render-tooltip",["exports","ember-tooltips/utils/render-tooltip"],function(e,t){e["default"]=t["default"]}),define("ilios-embeded/config/environment",["ember"],function(e){var t="ilios-embeded";try{var n=t+"/config/environment",i=e["default"].$('meta[name="'+n+'"]').attr("content"),a=JSON.parse(unescape(i));return{"default":a}}catch(o){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests?require("ilios-embeded/tests/test-helper"):require("ilios-embeded/app")["default"].create({name:"ilios-embeded",version:"0.5.0+a9e1f61e"});