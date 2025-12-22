'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserProfile(
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'ユーザー認証に失敗しました。' }
  }

  const name = formData.get('name') as string
  const avatarFile = formData.get('avatar') as File | null

  let avatarUrl: string | undefined = undefined

  // アバター画像がアップロードされている場合
  if (avatarFile && avatarFile.size > 0) {
    // ファイルパスを一意にするためにDate.now()を使用
    const filePath = `avatars/${user.id}/${Date.now()}.webp`

    const { error: uploadError } = await supabase.storage
      .from('profile') // バケット名
      .upload(filePath, avatarFile, {
        cacheControl: '3600',
        upsert: false, // 新しいタイムスタンプのファイルなので上書きは不要
      })

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError)
      return { success: false, message: `アバターのアップロードに失敗しました: ${uploadError.message}` }
    }

    const { data: publicUrlData } = supabase.storage.from('profile').getPublicUrl(filePath)

    if (!publicUrlData.publicUrl) {
      return { success: false, message: 'アバターURLの取得に失敗しました。' }
    }
    // キャッシュを無効化するためにタイムスタンプを追加
    avatarUrl = `${publicUrlData.publicUrl}?t=${new Date().getTime()}`
  }

  // 更新するデータを準備
  const updates: { name: string; avatar_url?: string } = {
    name,
  }
  if (avatarUrl) {
    updates.avatar_url = avatarUrl
  }

  // usersテーブルを更新
  const { error: updateError } = await supabase.from('users').update(updates).eq('user_id', user.id)

  if (updateError) {
    console.error('Error updating user profile:', updateError)
    return { success: false, message: `プロフィールの更新に失敗しました: ${updateError.message}` }
  }

  // サイト全体でアバターが更新されるように、ルートをrevalidate
  revalidatePath('/', 'layout')

  return { success: true, message: 'プロフィールを更新しました。' }
}
