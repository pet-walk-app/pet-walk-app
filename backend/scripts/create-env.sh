#!/bin/bash

generate_secure_value() {
  local length=$1
  openssl rand -base64 $length | tr -d '\n'
}

JWT_SECRET_LENGTH=256
PASSWORD_LENGTH=16

DEFAULT_DATABASE_LOGIN="locallogin"
DEFAULT_DATABASE_PASS=$(generate_secure_value $PASSWORD_LENGTH)
DEFAULT_DATABASE_ROOT_PASS=$(generate_secure_value $PASSWORD_LENGTH)
DEFAULT_JWT_SECRET=$(generate_secure_value $JWT_SECRET_LENGTH)
DEFAULT_TOKEN_EXPIRATION_TIME="86400000"

update_env_file() {
  local key=$1
  local value=$2
  local file=$3

    if [ -s "$file" ] && [ "$(tail -c 1 "$file")" != "" ]; then
      echo >> "$file"
    fi

  if ! grep -q "^$key=" "$file"; then
    echo "$key=$value" >> "$file"
    echo "Added $key to $file"
  fi
}

ENV_FILE="../.env"

declare -A default_values=(
  ["DATABASE_LOGIN"]="$DEFAULT_DATABASE_LOGIN"
  ["DATABASE_PASS"]="$DEFAULT_DATABASE_PASS"
  ["DATABASE_ROOT_PASS"]="$DEFAULT_DATABASE_ROOT_PASS"
  ["JWT_SECRET"]="$DEFAULT_JWT_SECRET"
  ["TOKEN_EXPIRATION_TIME"]="$DEFAULT_TOKEN_EXPIRATION_TIME"
)

if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found. Creating it and adding default values..."
  touch "$ENV_FILE"
fi

for key in "${!default_values[@]}"; do
  update_env_file "$key" "${default_values[$key]}" "$ENV_FILE"
done