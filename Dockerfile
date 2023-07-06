FROM node:slim


RUN apt-get update -y && apt-get install gnupg wget -y && \
  apt-get install tor -y --no-install-recommends && \
  apt-get install torsocks -y --no-install-recommends && \
  apt-get install curl gnupg -y 


EXPOSE 9050

CMD ["tor"]