#!/bin/bash

CLIENT_WEB_DIR="${CLIENT_WEB_DIR:?Error: CLIENT_WEB_DIR environment variable is required}"

DRY_RUN=false
if [[ "$1" == "--dry-run" || "$1" == "-n" ]]; then
    DRY_RUN=true
fi

error_count=0
skipped_count=0
copied_count=0

while IFS='|' read -r error_file import_path; do
    ((error_count++))

    if [[ $import_path == . ]] || [[ $import_path == ../* ]] || [[ $import_path == ../* ]]; then
        ((skipped_count++))
        echo "Skipping $import_path (relative import) from $error_file"
        continue
    fi

    source_file="${import_path/@/}"
    source_path="${CLIENT_WEB_DIR}/${source_file}"

    # Try common file extensions
    copied=false
    for ext in ".ts" ".tsx" ".js" ".jsx"; do
        if [[ -f "${source_path}${ext}" ]]; then
            target_file="externals/${source_file}${ext}"
            target_dir="$(dirname "$target_file")"

            if [ "$DRY_RUN" = true ]; then
                echo "Would copy ${import_path} to ${target_file}"
            else
                mkdir -p "$target_dir"
                cp "${source_path}${ext}" "$target_file"
                echo "Copied ${import_path} to ${target_file}"
            fi

            copied=true
            ((copied_count++))
            break
        fi
    done

    if [ "$copied" = false ]; then
        echo "NotFound: $import_path ($source_path) from $error_file"
    fi
done < <(yarn typecheck 2>&1 | grep -E "Cannot find module|Module not found" | sed -n "s/\\([^:]*\\).*['\"]\\([^'\"]*\\)['\"].*/\\1|\\2/p" |  sort -u)


echo "===================================" 
if [ "$DRY_RUN" = true ]; then
    echo "-----------------------------------" 
    echo "---------- DRY RUN MODE -----------"
    echo "-----------------------------------" 
    echo "$error_count errors; $copied_count files to copy and $skipped_count to skip."
else 
    echo "$error_count errors; $copied_count files copied and $skipped_count skipped."
fi
