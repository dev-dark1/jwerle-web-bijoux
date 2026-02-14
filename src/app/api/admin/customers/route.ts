import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Fetch customers from database with their order counts
    const { data: customers, error } = await supabaseAdmin
      .from('customers')
      .select('id, name, email, phone, city, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Customers fetch error:', error)
      return NextResponse.json({
        customers: [],
        error: 'Failed to fetch customers'
      }, { status: 500 })
    }

    // Enrich with order counts
    const enrichedCustomers = await Promise.all(
      (customers || []).map(async (customer) => {
        const { count } = await supabaseAdmin
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('customer_email', customer.email)

        return {
          ...customer,
          order_count: count || 0
        }
      })
    )

    return NextResponse.json({
      customers: enrichedCustomers,
      error: null
    })
  } catch (error) {
    console.error('[v0] Customers route error:', error)
    return NextResponse.json({
      customers: [],
      error: 'Server error while fetching customers'
    }, { status: 500 })
  }
}
