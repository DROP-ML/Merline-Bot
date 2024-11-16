# Skip Python check
ENV YOUTUBE_DL_SKIP_PYTHON_CHECK=1

# Continue with the npm install
RUN --mount=type=cache,id=s/1da56fff-d4e6-4417-8e7e-2342a8fd257e-/root/npm,target=/root/.npm npm ci
