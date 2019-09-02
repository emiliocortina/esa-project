define({ "api": [
  {
    "type": "post",
    "url": "/api/private/topic",
    "title": "Creates a topic",
    "name": "PostTopic",
    "group": "Topic",
    "parameter": {
      "examples": [
        {
          "title": "Create topic example:",
          "content": " {\n\n \n\t    \"title\":\"Topic title\",\n\t    \"text_content\":\"Topic content\",\n     \"comments\":[]\n\n\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/topics.routes.js",
    "groupTitle": "Topic"
  }
] });
