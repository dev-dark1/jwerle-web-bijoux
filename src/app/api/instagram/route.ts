import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '6'

    // Check if Instagram API credentials are configured
    const igAccessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const igUserId = process.env.INSTAGRAM_USER_ID

    if (!igAccessToken || !igUserId) {
      console.warn('[v0] Instagram API credentials not configured')
      return NextResponse.json({
        posts: [],
        error: 'Instagram integration not configured. Please add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to environment variables.',
      }, { status: 200 }) // Return 200 with empty array instead of error
    }

    // Fetch from Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/v18.0/${igUserId}/media?fields=id,media_type,media_url,caption,permalink,like_count,comments_count,timestamp&limit=${limit}&access_token=${igAccessToken}`
    )

    if (!response.ok) {
      console.error('[v0] Instagram API error:', response.status, response.statusText)
      return NextResponse.json({
        posts: [],
        error: 'Unable to fetch Instagram feed',
      }, { status: 200 })
    }

    const data = await response.json()

    return NextResponse.json({
      posts: data.data || [],
      error: null,
    })
  } catch (error) {
    console.error('[v0] Instagram route error:', error)
    return NextResponse.json({
      posts: [],
      error: 'Server error while fetching Instagram feed',
    }, { status: 200 })
  }
}
