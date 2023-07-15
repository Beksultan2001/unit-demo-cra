Release Version: ${{ steps.determine_version.outputs.version }}

Changelog:
${{ steps.generate_changelog.outputs.changelog }}

Deployment Link: [GitHub Pages Deployment](https://${{ github.repository }}.github.io/${{ github.event.repository.name }}/)