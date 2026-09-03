#!/usr/bin/env bash
# Figma html-to-design capture — MacBook 13" (1280px browser width)
# Target: https://www.figma.com/design/t7vAMEhOoRqD7hiBhhnirE/International
# Viewport: MacBook Pro 16" (1728×1117)
BASE="http://localhost:3001"
DELAY="figmadelay=3500"
EP="figmaendpoint=https%3A%2F%2Fmcp.figma.com%2Fmcp%2Fcapture%2F"
CART="figmaSeed=cart"

open_capture() {
  local path="$1"
  local id="$2"
  open "${BASE}${path}#figmacapture=${id}&${EP}${id}%2Fsubmit%3FbindVariables%3Dtrue&${DELAY}"
}

echo "Opening capture tabs — submit each in the Figma toolbar."

# Marketing
open_capture "/about" "7ee173bf-8c1f-44bd-8434-1c3f014aa968"
sleep 2
open_capture "/contact" "816f8995-db1f-454b-8357-b5a3d90950b7"
sleep 2
open_capture "/stores" "a6cd7ca7-5fa4-4dab-85d4-bcde4f1e87d6"
sleep 2
open_capture "/size-guide" "0e5d9a10-0c07-47de-b7da-88bee1af2251"
sleep 2
open_capture "/blogs" "e6712386-175e-46ad-8c30-909cbe110b01"

# Catalogue & PDP
sleep 2
open_capture "/jewellery/rings" "c8dc20d6-f22e-439d-a0df-7a79a9e554b2"
sleep 2
open_capture "/jewellery/bracelets/925-sterling-silver-beat-drop-bracelet" "a9b773cf-0630-4f33-bb4f-4ddcf0d82226"

# Collections
sleep 2
open_capture "/collections" "506d1150-6c83-47e6-b209-4a1493dbab39"
sleep 2
open_capture "/collections/essential" "d41001bd-72d6-4ab2-a466-199988b8fe72"

# Policies & Account
sleep 2
open_capture "/policies" "8e4ec33d-868e-4c09-a612-2df12901a95b"
sleep 2
open_capture "/account" "c73a684d-42bc-4553-b9ee-1881756333e9"

# Checkout (cart auto-seeded via ?figmaSeed=cart)
sleep 2
open_capture "/checkout/address?${CART}" "d5155858-8989-4a87-9402-d5d6ad4c4d9c"
sleep 2
open_capture "/checkout/coupon?${CART}" "fce2095a-502e-46e4-83f0-54d266a8db20"
sleep 2
open_capture "/checkout/review?${CART}" "bb0d04be-b52a-4095-968c-003c74207e24"
sleep 2
open_capture "/checkout/confirmation?${CART}" "11497d66-472c-4ebf-9e12-51c4cf9b82e5"

# System
sleep 2
open_capture "/this-page-does-not-exist" "65a50737-9435-4e80-be5f-9e236804a3fd"
