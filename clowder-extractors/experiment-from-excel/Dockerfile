FROM python:3.10

ARG VERSION="unknown"
ARG BUILDNUMBER="unknown"
ARG GITSHA1="unknown"

# environemnt variables
ENV VERSION=${VERSION} \
    BUILDNUMBER=${BUILDNUMBER} \
    GITSHA1=${GITSHA1} \
    STREAM=requests \
    RABBITMQ_QUEUE="remat.experiment.from_excel" \
    EXTRACTOR_HASHLIST="md5","sha1","sha224","sha256","sha384","sha512"

WORKDIR /extractor
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY remat.experiment_from_excel.py extractor_info.json ./
CMD python remat.experiment_from_excel.py