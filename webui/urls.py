from django.conf.urls import patterns, url

from webui import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^results/(?P<aid>\d+)/$', views.results, name='results'),
    url(r'^browse/$', views.showgenomes, name='browse'),
    url(r'^about/$', views.about, name='about'),
    url(r'^download/$', views.download, name='download'),
    url(r'^download/coordinates/$', views.downloadCoordinates, name='downloadcoordinates'),
    url(r'^resources/$', views.resources, name='resources'),
    url(r'^constactus/$', views.contactus, name='contactus'),
    url(r'^faq/$', views.faq, name='faq'),
    url(r'^islandpick/$', views.islandpick, name='islandpick'),
    url(r'acknowledgements', views.acknowledgements, name='acknowledgements'),
    url(r'^plot/(?P<aid>\d+)/$', views.circularplotjs, name='circularplotjs'),
    url(r'^json/gis/(?P<aid>\d+)/$', views.tablejson, name="tablejson"),
    url(r'^islands/$', views.fetchislands, name="fetchislands"),
    url(r'^islands/fasta/$', views.fetchislandsfasta, name="fetchislandsfasta"),
    url(r'^json/genes/(?P<gi_id>\d+)/$', views.genesjson, name="genesjson"),
    url(r'^upload/$', views.uploadform, name="uploadform"),
    url(r'^status/$', views.runstatus, name='runstatus'),
    url(r'^status/json/$', views.runstatusjson, name='runstatusjson'),
    url(r'^results/graph/(?P<aid>\d+)/$', views.graphanalysis, name='graphanalysis'),
    url(r'^results/graph/js/(?P<aid>\d+)/$', views.graphanalysisjs, name='graphanalysisjs'),
    url(r'^upload/(?P<upload_id>\d+)/$', views.uploadredirect, name='uploadredirect'),
)
