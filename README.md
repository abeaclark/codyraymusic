# links.codyraymusic.com

## How to add another page:
1) Create a text file with all the information you want included on the page
    * Text file should follow the format of pages at [src/pages/linkPages](https://github.com/abeaclark/codyraymusic/blob/master/src/pages/linkPages)
        - For a given file, press the "Raw" button to see the text file
        - Press "upload files", then drag the file and commit changes
    * Mailchimp link will stay the same, see instructions for creating Mailchimp sequence below

2) Add the cover image
    * Image path should be `/media/FILENAME`
    * You need to add the photo to this folder: [static/media](https://github.com/abeaclark/codyraymusic/tree/master/static/media)
    * Press "upload files", then drag the file and commit changes

3) The site will auto-deploy in a few minutes. Check out the path you specified in the text file to ensure it worked

4) Set up Mailchimp to send the email for this form
    * Campaigns > Create Campaign > Email > Automated > Subscriber Activity > Welcome new subscribers
    * Campaign name: Name of song
    * List: Cody Ray Music
    * Edit Trigger so that Delay is "immediately"
    * Filter by segment or tag > Choose segment or tag > Subscribers match the following conditions
        - Signup Page is `THE PATH TO YOUR SONG IN THE FILE` (ex: `/gengar/`, `/take-your-broke-ass-home/`)
        - Trailing slash is important
    * Design Email > Fill out > Saved Templates > Re-use the template for sending track
        * Follow [these instructions](https://mailchimp.com/help/share-files-with-contacts/) to add the track link
