FROM java:8
VOLUME /tmp 
COPY target/mysecurityjpa1.jar app.jar 
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
